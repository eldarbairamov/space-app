export class ApiException extends Error {
   constructor(message: string, public status: number) {
      super(message);
      this.status = status;
   }

   static Database(e: unknown) {
      console.log(e);
      return new ApiException("Database: Error", 500);
   }

   static BadRequest() {
      return new ApiException("Bad request", 400);
   }

   static NotFound() {
      return new ApiException("Object is not found", 404);
   }

   static ObjectID() {
      return new ApiException("Id is not valid", 400);
   }

}