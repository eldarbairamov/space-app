import { PlanItem } from "@src/component";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { planAction } from "@src/redux/slice";
import { useObserver } from "@src/hook/use-observer";

import style from "./Plan-List.module.scss";
import emptyDark from "/empty-dark.svg";
import emptyLight from "/empty-light.svg";

export function PlanList() {
   const { plans } = useAppSelector(state => state.planReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const { lastElemRef } = useObserver(() => dispatch(planAction.next()))

   return (
      <>
         { !!plans.length &&
            <div className={ style.PlanList }>
               { plans && plans.map((item, index) => {
                  if (plans.length == index + 1) {
                     return <PlanItem ref={ lastElemRef } key={ item.id } plan={ item }/>;
                  } else {
                     return <PlanItem key={ item.id } plan={ item }/>;
                  }
               }) }
            </div> }

         { !plans.length &&
            <div className={ style.no_plans_wrapper }>
               <img src={ isDark ? emptyLight : emptyDark } alt={ "empty" } style={ { width: "80px" } }/>
               <p> Пусто.. </p>
            </div> }
      </>
   );
}
