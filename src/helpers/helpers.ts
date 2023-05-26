import {UserEntity} from "../utils/DB/entities/DBUsers";
import {MemberTypeEntity} from "../utils/DB/entities/DBMemberTypes";
import {ProfileEntity} from "../utils/DB/entities/DBProfiles";

export function checkIsValidID(str: string) {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(str);
}

export function isNotUser(user: UserEntity | null, memberType: MemberTypeEntity | null, profile:  ProfileEntity | null) {
  return !user || !memberType || profile
}