import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";
import InputField, { InputType } from "../../components-shared/shared/formik/input-field"; // InputType,
import { useDispatch } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import { getUserToken } from "../../lib/modules/user/user.model";

import { NftService } from "../../lib/modules/nft/nft.repo";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import useContract from "../../hooks/use-contract";
import { SMTransaction } from "../../lib/models/blockchain.model";
import { ChainNetworks } from "../../lib/helpers/network.helper";

const ModalImportNfts = ({
  open,
  turnOffModal,
  listJson,
  loadData,
}: {
  open: boolean;
  turnOffModal: any;
  listJson: string;
  loadData: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const submit = (
    { groupName, fromRareRate, toRareRate }: ImportProps,
    { setSubmitting }: FormikHelpers<ImportProps>
  ) => {
    setSubmitting(false);
    addDataNft({ listJson, groupName, fromRareRate, toRareRate });
    turnOffModal();
  };

  const addDataNft = ({
    listJson,
    fromRareRate,
    toRareRate,
    groupName,
  }: {
    listJson: string;
    fromRareRate: number;
    toRareRate: number;
    groupName?: string;
  }) => {
    // console.log("list", listJson);
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    NftService.importNftsByJsonResouce({ token, listJson, fromRareRate, toRareRate, groupName })
      .then((res) => {
        toast.success("Mint NFT successfully.");
        loadData();
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)(dispatch);
        toast.error("System error. Modify data unsuccessfully.");
      });
    setLoading(false)(dispatch);
  };

  const Actions = () => {
    return (
      <div className="relative flex justify-end p-4 pb-3 pt-2 bg-white z-10 border-t border-gray-3 rounded-b">
        <Button
          submit={false}
          onClick={turnOffModal}
          className="btn-large px-8 mr-2"
          large
          hoverDarken
        >
          Cancel
        </Button>

        <Button submit={true} className="btn-large px-8" primary asyncLoading>
          Save
        </Button>
      </div>
    );
  };

  return (
    <Dialog
      width="450px"
      dialogClass="relative bg-white shadow-md rounded m-auto"
      isOpen={open}
      onClose={turnOffModal}
      mobileMode={false}
      title="Import nfts"
    >
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="p-3">
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  labelName={"Rare Rate From"}
                  inputName={"fromRareRate"}
                  inputType={InputType.number}
                  placeholder={`Input From Rare Rate From`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
                <InputField
                  labelName={"Rare Rate To"}
                  inputName={"toRareRate"}
                  inputType={InputType.number}
                  placeholder={`Input Rare Rate To`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
              </div>
              <InputField
                labelName={"Group Name"}
                inputName={"groupName"}
                placeholder={`Input group name`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
            </div>
            <Actions />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalImportNfts;

// const validationSchema = Yup.object().shape({
//   name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
// });

const initialValues = {
  fromRareRate: 1,
  toRareRate: 50,
  groupName: "",
};

type ImportProps = {
  fromRareRate: number;
  toRareRate: number;
  groupName: string;
};
