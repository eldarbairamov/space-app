import React, { FC } from "react";

import { INote } from "../../../interface";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { DeleteOutlined } from "@ant-design/icons";
import { noteActions } from "../../../redux/slice";
import * as dateHelper from "moment";
import { message } from "antd";
import { deleteNoteService } from "../../../service";

import style from "./Note-Item.module.scss";

interface INoteItem {
   note: INote;
}

export const NoteItem: FC<INoteItem> = ({ note }) => {
   const bodyCondition = note.body && note.body.split("").length > 35;
   const titleCondition = note.title && note.title.split("").length > 30;

   const [ messageApi, contextHolder ] = message.useMessage();

   const dispatch = useAppDispatch();

   const { deleteNoteFn } = deleteNoteService(messageApi);

   const { activeNote } = useAppSelector(state => state.notesReducer);

   const deleteNote = async (noteId: INote["id"], e: React.MouseEvent<HTMLParagraphElement>): Promise<void> => {
      e.stopPropagation();
      await deleteNoteFn(noteId);
   };

   return (
      <div className={ style.NoteItem }
           onClick={ () => dispatch(noteActions.setActiveNoteId(note.id)) }
           data-active={ note.id === activeNote?.id }
      >
         { contextHolder }

         {/* Title */ }
         <p className={ style.note_title }>
            { titleCondition ? note.title.substring(0, 30) + "..." : note.title }
         </p>

         {/* Delete icon */ }
         <p className={ style.delete }
            onClick={ (e) => deleteNote(note.id, e) }
         >
            <DeleteOutlined style={ { fontSize: "17px" } }/>
         </p>

         {/* Text preview */ }
         <p className={ style.note_body }>
            { bodyCondition ? note.body.substring(0, 35) + "..." : note.body }
         </p>

         {/* Date */ }
         <p className={ style.note_date }>
            { dateHelper(note.lastModified).format("DD-MM-YYYY, HH:mm") }
         </p>

      </div>
   );
};