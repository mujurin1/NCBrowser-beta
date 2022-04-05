import { SetonlyCollection, Trigger } from "@ncb/common";
import {
  UpdateVariation,
  NcbComment,
  NcbUser,
} from "@ncb/ncbrowser-definition";
import { ChatStore } from "../ChatStore";

export class ChatStoreImpl implements ChatStore {
  comments = new SetonlyCollection<NcbComment>((comment) => comment.globalId);
  users = new SetonlyCollection<NcbUser>((user) => user.globalId);

  readonly changeCommentNotice = new Trigger<[UpdateVariation]>();
  readonly changeUserNotice = new Trigger<[UpdateVariation]>();

  public changeComments(variation: UpdateVariation, ...comments: NcbComment[]) {
    if (variation === "Add" || variation === "Update") {
      for (const comment of comments) {
        this.comments.set(comment);
      }
    }
    this.changeCommentNotice.fire(variation);
  }

  public changeUsers(variation: UpdateVariation, ...users: NcbUser[]) {
    if (variation === "Add" || variation === "Update") {
      for (const user of users) {
        this.users.set(user);
      }
    }
    this.changeUserNotice.fire(variation);
  }
}
