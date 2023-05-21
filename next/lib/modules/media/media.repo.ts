import { CrudRepository } from "../../repo/crud.repo";
import { Media } from "./media.model";
import { MediaFields } from "./media.field";
import { MediaCategoryFields } from "../media-category/media-category.field";

export class MediaRepository extends CrudRepository<Media> {
  apiName = "Media";

  shortFragment = this.parseFragment(`
    ${MediaFields}
    mediaCategory{
      ${MediaCategoryFields}
    }
  `);

  fullFragment = this.parseFragment(`
    ${MediaFields}
    mediaCategory{
      ${MediaCategoryFields}
    }
  `);
}

export const MediaService = new MediaRepository();
