import { useParams } from "react-router-dom";
import { IMoment } from "@src/interface";
import { useAppDispatch, useModal } from "@src/hook";
import { getMomentService } from "@src/service";
import { motion } from "framer-motion";
import { DateAndLocation, Loader, Modal, Photo, SaveAndDelete, Tag, Title } from "@src/component";
import { momentActions } from "@src/redux/slice";
import { MOMENTS_COLOR } from "@src/constant/color.constant";

import style from "./Moment-Edit-Page.module.scss";

export function MomentEditPage() {
   const { momentId } = useParams<{ momentId: string }>();

   const { prevState, setPrevState, isLoading, activeMoment } = getMomentService(momentId!);

   const isActiveMomentHasKeys = Object.keys(activeMoment).length;

   const { toggleModal } = useModal(isLoading);

   const dispatch = useAppDispatch();

   const handleInputs = (field: string, value: string) => {
      if (value.length <= 20) {
         const updatedMoment = {
            ...activeMoment,
            [field]: value,
         } as IMoment;

         dispatch(momentActions.setActiveMoment(updatedMoment));
      }
   };

   return (
      <>
         { !isLoading &&
            <motion.div className={ style.MomentEditPage }
                        initial={ { x: -10 } }
                        animate={ { x: 0 } }>

               { isActiveMomentHasKeys &&
                  <div className={ style.moment }>
                     <SaveAndDelete momentId={ momentId! }
                                    activeMoment={ activeMoment }
                                    setPrevState={ setPrevState }
                                    prevState={ prevState }/>

                     <Title activeMoment={ activeMoment }
                            handleInputs={ handleInputs }/>

                     <Photo momentId={ momentId! }
                            activeMoment={ activeMoment }/>

                     <DateAndLocation
                        handleInputs={ handleInputs }
                        activeMoment={ activeMoment }/>

                     <Tag activeMoment={ activeMoment }/>
                  </div>
               }

            </motion.div>
         }

         <Modal isOpen={ isLoading }
                onClose={ toggleModal }
                isBg={ false }>
            <Loader color={ MOMENTS_COLOR }/>
         </Modal>

      </>
   );
}
