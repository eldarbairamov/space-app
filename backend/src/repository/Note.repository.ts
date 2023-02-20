import { FilterQuery, UpdateQuery } from "mongoose";
import { ApiException } from "../exception/api.exception";
import { INote, NoteDocument, NoteModel, UserDocument } from "../model";

export const NoteRepository = {

   create: async (body: Partial<INote>): Promise<NoteDocument> => {
      try {
         return NoteModel.create(body);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   find: async (filter: FilterQuery<INote>, searchKey: string): Promise<NoteDocument[]> => {
      const filterObj = searchKey ? { ...filter, title: { $regex: searchKey, $options: "i" } } : { ...filter };
      try {
         return NoteModel.find(filterObj).sort({ updatedAt: "desc" });
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   findById: async (noteId: NoteDocument["id"]): Promise<NoteDocument | null> => {
      try {
         return NoteModel.findById(noteId);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   findByIdAndUpdate: async (noteId: NoteDocument["id"], body: UpdateQuery<INote>): Promise<NoteDocument | null> => {
      try {
         return NoteModel.findByIdAndUpdate(noteId, body, { new: true });
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   findByIdAndDelete: async (noteId: NoteDocument["id"]): Promise<NoteDocument | null> => {
      try {
         return NoteModel.findByIdAndDelete(noteId);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   count: async (userId: UserDocument["id"]): Promise<number> => {
      try {
         return NoteModel.count({ ownerId: userId });
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

};