import { ReadonlyCollection, SetonlyCollection } from "@ncb/common";
import {
  UpdateVariation,
  NcbComment,
  NcbUser,
} from "@ncb/ncbrowser-definition";
import { ChatStore } from "../ChatStore";

export class ChatStoreImpl implements ChatStore {
  #comments = new SetonlyCollection<NcbComment>((comment) => comment.globalId);
  #users = new SetonlyCollection<NcbUser>((user) => user.globalId);

  public get comments(): ReadonlyCollection<NcbComment> {
    return this.#comments;
  }
  public get users(): ReadonlyCollection<NcbUser> {
    return this.#users;
  }

  public changeComments(valiation: UpdateVariation, ...comments: NcbComment[]) {
    if (valiation === "Add" || valiation === "Update") {
      for (const comment of comments) {
        this.#comments.set(comment);
      }
    } else if (valiation === "Delete") {
    }
  }

  public changeUsers(valiation: UpdateVariation, ...users: NcbUser[]) {
    if (valiation === "Add" || valiation === "Update") {
      for (const user of users) {
        this.#users.set(user);
      }
    } else if (valiation === "Delete") {
    }
  }
}
