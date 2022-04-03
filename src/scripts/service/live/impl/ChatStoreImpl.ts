import { SetonlyCollection } from "@ncb/common";
import {
  UpdateVariation,
  NcbComment,
  NcbUser,
} from "@ncb/ncbrowser-definition";
import { ChatStore } from "../ChatStore";

export class ChatStoreImpl implements ChatStore {
  comments = new SetonlyCollection<NcbComment>((comment) => comment.globalId);
  users = new SetonlyCollection<NcbUser>((user) => user.globalId);

  public changeComments(variation: UpdateVariation, ...comments: NcbComment[]) {
    if (variation === "Add" || variation === "Update") {
      for (const comment of comments) {
        this.comments.set(comment);
      }
    }
  }

  public changeUsers(variation: UpdateVariation, ...users: NcbUser[]) {
    if (variation === "Add" || variation === "Update") {
      for (const user of users) {
        this.users.set(user);
      }
    }
  }
}
