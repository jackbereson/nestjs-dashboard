import { CrudRepository } from "../../repo/crud.repo";
import { MediaCategory } from "./media-category.model";
import { MediaCategoryFields } from "./media-category.field";

export class MediaCategoryRepository extends CrudRepository<MediaCategory> {

  apiName = "MediaCategory";

  shortFragment = this.parseFragment(`
    ${MediaCategoryFields}
  `);

  fullFragment = this.parseFragment(`
    ${MediaCategoryFields}
  `);

}

export const MediaCategoryService = new MediaCategoryRepository();