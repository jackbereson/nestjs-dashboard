import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { classNames } from "../../lib/helpers/design";
import { SettingGroup } from "../../lib/modules/setting-group/setting-group.model";
import { setLoading } from "../../redux/actions/loading.action";
import { getSettingGroups } from "../../redux/actions/setting-group.action";
import { ApiStatus } from "../../redux/redux.helper";
import { useDispatch, useSelector } from "../../redux/store";

import NextIcon from "../../components-shared/next-icon";
import { useToast } from "../../providers/toast-provider";
import { logoutUser } from "../../redux/actions/user.action";

const SettingMenu = () => {
  const [settingGroupReducer] = useSelector(({ settingGroupReducer }) => [settingGroupReducer]);

  const [groups, setGroups] = useState<SettingGroup[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (settingGroupReducer.settingGroups) {
      setGroups(settingGroupReducer.settingGroups);
    }
  }, [settingGroupReducer.settingGroups]);

  useEffect(() => {
    setLoading(true)(dispatch);
    getSettingGroups({}, handleError)(dispatch);
  }, []);

  useEffect(() => {
    if (settingGroupReducer.status === ApiStatus.LOADED) {
      setLoading(false)(dispatch);
    }
  }, [settingGroupReducer.status]);

  const handleError = (error: Error) => {
    console.log("error", error.message);
    setLoading(false)(dispatch);
    toast.error(error.message);
    logoutUser()(dispatch);
    router.push("/signin");
  };

  const Wrapper = (props) => {
    return (
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl">
        <ul className="md:flex-col md:min-w-full flex flex-col list-none divide-y divide-light-blue-400 bg-white rounded-lg overflow-hidden">
          {props.children}
        </ul>
      </div>
    );
  };

  if (!groups) {
    return (
      <Wrapper>
        <li className="items-center px-3">
          <div className="text-xs uppercase py-3 font-bold block ">Loading...</div>
        </li>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {groups.map((group, k: number) => {
        return (
          <li
            className={classNames(
              "items-center px-3",
              "hover:bg-seconds-dark hover:text-white",
              router.query.slug === group.slug ? "bg-primary text-white" : ""
            )}
            key={k}
          >
            <Link href={`/setting/${group.slug}`}>
              <a className="py-3 flex items-center gap-4">
                <NextIcon name={group.icon} className="text-3xl" />
                <div className="text-sm font-light">
                  <div className="font-bold uppercase">{group.name}</div>
                  {group.desc}
                </div>
              </a>
            </Link>
          </li>
        );
      })}
    </Wrapper>
  );
};

export default SettingMenu;
