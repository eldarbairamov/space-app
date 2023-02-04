import React, { type FC, useEffect, useState } from "react";

import { useLocation } from "react-router";
import { catchErrors, dateFormat } from "../../../helper";
import { planService, taskService } from "../../../services";
import { TasksItem } from "../../../component/Plans/Tasks/Tasks-Item/Tasks-Item";
import { Toaster } from "react-hot-toast";
import { type IPlan } from "../../../interface/plan.interface";
import { type ITask } from "../../../interface/task.interface";

import style from "./Tasks-Page.module.scss";
import { AddTaskDto } from "../../../dto/add-task.dto";

export interface IInputFields {
   planTitle: string,
   taskTitle: string
}

export const TasksPage: FC = () => {
   const { plan } = useLocation().state as { plan: IPlan };

   const [ tasks, setTasks ] = useState<ITask[]>([]);

   const [ inputFields, setInputFields ] = useState<IInputFields>({ planTitle: plan.title, taskTitle: "" });

   const addTask = async (): Promise<void> => {
      if (inputFields.taskTitle !== "") {
         try {
            setInputFields({ ...inputFields, taskTitle: "" });

            const addTaskDto = { planId: plan.id, title: inputFields.taskTitle } as AddTaskDto;

            const { data } = await taskService.addTask(addTaskDto);

            setTasks([ ...tasks, data ]);

         } catch (e) {
            catchErrors(e);
         }
      }
   };

   const onChangeFields = (field: string, value: string) => {
      setInputFields({ ...inputFields, [field]: value });
   };

   const changePlansTitle = async (): Promise<void> => {
      try {
         await planService.updatePlan(plan.id, inputFields.planTitle);

      } catch (e) {
         catchErrors(e);
      }
   };

   const formatDate = dateFormat(plan.lastModified);

   useEffect(() => {
      taskService.getAllTasks(plan.id).then(res => setTasks(res.data));
   }, []);

   return (
      <div className={ style.TasksPage }>

         {/* Toaster */ }
         <Toaster
            toastOptions={ {
               error: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#df8281",
                     secondary: "white",
                  },
               },
               success: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#84df81",
                     secondary: "white",
                  },
               },
            } }
         />

         <div className={ style.top }>
            <input type={ "text" }
                   className={ style.plan_title }
                   id={ "planTitle" }
                   value={ inputFields.planTitle }
                   onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onChangeFields("planTitle", e.target.value) }
                   onBlur={ (changePlansTitle) }
                   autoFocus
            />
            <p className={ style.plan_date }> { formatDate } </p>
         </div>

         <div className={ style.mid }>
            <div className={ style.add_task }>
               <p onClick={ addTask }> + </p>
               <input type={ "text" }
                      id={ "taskTitle" }
                      value={ inputFields.taskTitle }
                      onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onChangeFields("taskTitle", e.target.value) }
                      placeholder={ "Додати задачу" }
               />
            </div>
         </div>

         <div className={ style.bottom }>
            <div className={ style.task_list }>
               { tasks && tasks.map(task => (
                  <TasksItem key={ task.id } task={ task } setTasks={ setTasks } tasks={ tasks }/>
               )) }
            </div>
         </div>

      </div>
   );
};