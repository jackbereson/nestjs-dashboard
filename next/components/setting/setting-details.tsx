import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setLoading } from "../../redux/actions/loading.action";
import { getSettingGroups } from "../../redux/actions/setting-group.action";
import { useDispatch, useSelector } from "../../redux/store";
import ModalUpdateSetting from "./modal-update-setting";
import { Button } from "../../components-shared/shared/utilities/form/button";
import ModalUpdateGroupSetting from "./modal-update-group-setting";
import { SettingGroup } from "../../lib/modules/setting-group/setting-group.model";
import {
  EditMode,
  Setting,
  SettingType,
} from "../../lib/modules/setting/setting.model";
import ModalDeleteSetting from "./modal-delete-setting";
import ModalCreateSetting from "./modal-create-setting";
import { classNames } from "../../lib/helpers/design";
import ModalResetSettingGroup from "./modal-reset-setting-group";
import NextIcon, { FCIcons } from "../../components-shared/next-icon";

const SettingDetails = () => {
  const [settings, setSettings] = useState<Setting[]>();
  const [group, setGroup] = useState<SettingGroup>();
  const [selectedSetting, setSetting] = useState<Setting>(null);
  const [openUpdateSettingModal, setopenUpdateSettingModal] = useState(false);
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [openDeleteSettingModal, setOpenDeleteSettingModal] = useState(false);
  const [openCreateSettingModal, setOpenCreateSettingModal] = useState(false);
  const [openResetSettingGroupModal, setOpenResetSettingGroupModal] = useState(
    false
  );

  const [settingGroupReducer] = useSelector(({ settingGroupReducer }) => [
    settingGroupReducer,
  ]);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      settingGroupReducer.settingGroups &&
      settingGroupReducer.settingGroups.length > 0
    ) {
      if (router.query) {
        const { slug } = router.query;
        const group = settingGroupReducer.settingGroups.find(
          (group) => group.slug === slug
        );
        if (group) {
          const { settings } = group;
          setSettings(settings);
          setGroup(group);
        }
      } else {
        const group = settingGroupReducer.settingGroups.find(
          (group) => group.slug === "COMMON"
        );
        if (group) {
          const { settings } = group;
          setSettings(settings);
          setGroup(group);
        }
      }
    }
  }, [settingGroupReducer.settingGroups, router.query]);

  const loadData = () => {
    getSettingGroups()(dispatch);
    setLoading(false);
    setSetting(null);
  };

  const toggleSettingUpdateModal = (setting: Setting) => {
    setopenUpdateSettingModal(!openUpdateSettingModal);
    setSetting(setting);
  };

  const toggleSettingDeleteModal = (setting: Setting) => {
    setOpenDeleteSettingModal(!openDeleteSettingModal);
    setSetting(setting);
  };

  const toggleUpdateGroupModal = () => {
    setOpenGroupModal(!openGroupModal);
  };

  const toggleCreateSettingModal = () => {
    setOpenCreateSettingModal(!openCreateSettingModal);
  };

  const toggleResetGroupModal = () => {
    setOpenResetSettingGroupModal(!openResetSettingGroupModal);
  };

  const Body = () => {
    return (
      <div className="flex-auto px-4 p-2 py-3">
        <div className="flex flex-wrap">
          <div className="w-full">
            {settings.map((setting, k) => {
              return (
                <div className="relative w-full mb-3" key={k}>
                  <label
                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    {setting.name}

                    <div className="float-right flex gap-2">
                      <button onClick={() => toggleSettingUpdateModal(setting)}>
                        Edit
                      </button>

                      {setting.editMode === EditMode.USER && (
                        <button
                          onClick={() => toggleSettingDeleteModal(setting)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </label>
                  {setting.type === SettingType.string && (
                    <div
                      className={classNames(
                        "w-full border-0 px-3 py-2 rounded",
                        "bg-white shadow",
                        "placeholder-blueGray-300 text-gray-600 text-sm",
                        "focus:outline-none focus:ring",
                        "ease-linear transition-all duration-150"
                      )}
                    >
                      {setting.value}
                    </div>
                  )}
                  {setting.type === SettingType.number && (
                    <div
                      className={classNames(
                        "w-full border-0 px-3 py-2 rounded",
                        "bg-white shadow",
                        "placeholder-blueGray-300 text-gray-600 text-sm",
                        "focus:outline-none focus:ring",
                        "ease-linear transition-all duration-150"
                      )}
                    >
                      {setting.value}
                    </div>
                  )}

                  {setting.type === SettingType.boolean && (
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      defaultChecked={setting.value}
                      readOnly
                    />
                  )}

                  {setting.type === SettingType.array && (
                    <div
                      className={classNames(
                        "w-full border-0 px-3 py-2 rounded",
                        "bg-white shadow",
                        "placeholder-blueGray-300 text-gray-600 text-sm",
                        "focus:outline-none focus:ring",
                        "ease-linear transition-all duration-150"
                      )}
                    >
                      {JSON.stringify(setting.value)
                        ? JSON.stringify(setting.value)
                        : ""}
                    </div>
                  )}

                  {setting.type === SettingType.json && (
                    <textarea
                      className={classNames(
                        "overflow-auto border-0 px-3 py-2 bg-white rounded ",
                        "text-gray-600 text-sm shadow",
                        "focus:outline-none focus:ring w-full",
                        "ease-linear transition-all duration-150",
                        "placeholder-blueGray-300"
                      )}
                      readOnly
                      rows={15}
                      defaultValue={JSON.stringify(
                        JSON.parse(setting.value),
                        null,
                        "\t"
                      )}
                    />
                  )}

                  {setting.type === SettingType.object && (
                    <textarea
                      className={classNames(
                        "overflow-auto border-0 px-3 py-2 bg-white rounded ",
                        "text-gray-600 text-sm shadow",
                        "focus:outline-none focus:ring w-full",
                        "ease-linear transition-all duration-150",
                        "placeholder-blueGray-300"
                      )}
                      readOnly
                      rows={15}
                      defaultValue={JSON.stringify(setting.value, null, "\t")}
                    />
                  )}

                  {setting.type === SettingType.richText && (
                    <div
                      className={classNames(
                        "w-full border-0 px-3 py-2 rounded",
                        "bg-white shadow",
                        "placeholder-blueGray-300 text-gray-600 text-sm",
                        "focus:outline-none focus:ring",
                        "ease-linear transition-all duration-150"
                      )}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: setting.value }}
                      />
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex justify-center">
              <Button
                icon={<NextIcon name={FCIcons.FcPlus} className='mr-2 text-lg' />}
                iconPosition={"start"}
                outline
                small
                onClick={toggleCreateSettingModal}
              >
                Add setting
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Header = () => {
    return (
      <div className="rounded-t bg-gray-200 mb-0 px-4 py-2">
        <div className="text-center flex justify-between">
          <h6 className="text-gray-700 text-lg font-bold flex items-center gap-2">
            <NextIcon name={group.icon} className="text-3xl" />
            {group.name}
          </h6>
          <div className="flex gap-2">
            <Button primary small onClick={toggleUpdateGroupModal}>
              Edit group
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className="rounded-b bg-gray-200 mb-0 px-4 py-2">
        <Button small success onClick={toggleResetGroupModal}>
          Reset
        </Button>
      </div>
    );
  };

  const Modals = () => {
    return (
      <>
        {openCreateSettingModal && (
          <ModalCreateSetting
            open={openCreateSettingModal}
            setOpen={toggleCreateSettingModal}
            settingGroup={group}
            loadData={loadData}
          />
        )}
        {openUpdateSettingModal && selectedSetting && (
          <ModalUpdateSetting
            open={openUpdateSettingModal}
            setOpen={setopenUpdateSettingModal}
            setting={selectedSetting}
            loadData={loadData}
          />
        )}
        {openGroupModal && (
          <ModalUpdateGroupSetting
            open={openGroupModal}
            setOpen={setOpenGroupModal}
            data={group}
            loadData={loadData}
          />
        )}
        {openDeleteSettingModal && selectedSetting && (
          <ModalDeleteSetting
            open={openDeleteSettingModal}
            setOpen={setOpenDeleteSettingModal}
            data={selectedSetting}
            loadData={loadData}
          />
        )}
        {openResetSettingGroupModal && (
          <ModalResetSettingGroup
            open={openResetSettingGroupModal}
            setOpen={setOpenResetSettingGroupModal}
            data={group}
            loadData={loadData}
          />
        )}
      </>
    );
  };

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {group && (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
          <Header />
          <Body />
          <Footer />
        </div>
      )}
      <Modals />
    </>
  );
};

export default SettingDetails;
