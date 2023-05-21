import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
// import * as Yup from "yup";

import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import {
  Media,
  MediaArgNames,
  MediaArgs,
  UpdateMediaInput,
} from "../../lib/modules/media/media.model";
import { MediaService } from "../../lib/modules/media/media.repo";
import { convertObjectNullToEmpty } from "../../lib/helpers/common.helper";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import InputField from "../../components-shared/shared/formik/input-field";
import { MediaCategoryService } from "../../lib/modules/media-category/media-category.repo";
import { MediaCategory } from "../../lib/modules/media-category/media-category.model";
import SelectField from "../../components-shared/shared/formik/select-field";
import { FiPlus } from "react-icons/fi";
import ModalMediaCategory from "../media-category/modal-media-category";

const ModalUpdateMedia = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: Media;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [categories, setCategories] = useState<MediaCategory[]>();

  useEffect(() => {
    loadMediaCategories();
  }, []);

  const loadMediaCategories = () => {
    MediaCategoryService.getAll({})
      .then((res) => {
        setCategories([{ id: null, name: "" }, ...res.data]);
      })
      .catch((error) => toast.error(error.message));
  };

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (values: Media, { setSubmitting }: FormikHelpers<Media>) => {
    updateData(values);
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const updateData = (values: Media) => {
    // console.log("---------params", params);
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;

    const params: UpdateMediaInput = {
      description: values.description,
      mediaCategoryId: values.mediaCategoryId,
    };

    MediaService.update({ id, data: params, token })
      .then(() => {
        loadData();
        toast.success("Modify data successfully.");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)(dispatch);
        toast.error("System error. Modify data unsuccessfully.");
      });
  };

  const getInitialValues = (params: Media) => {
    const data: Media = {
      ...convertObjectNullToEmpty(params),
    };
    return data;
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
      title="Update media"
    >
      <Formik
        initialValues={getInitialValues(data)}
        // validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="p-3">
              <InputField
                labelName={MediaArgNames.name}
                inputName={MediaArgs.name}
                placeholder={`Input ${MediaArgNames.name}`}
                readOnly
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={MediaArgNames.slug}
                inputName={MediaArgs.slug}
                placeholder={`Input ${MediaArgNames.slug}`}
                readOnly
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={MediaArgNames.url}
                inputName={MediaArgs.url}
                placeholder={`Input ${MediaArgNames.url}`}
                readOnly
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={MediaArgNames.description}
                inputName={MediaArgs.description}
                placeholder={`Input ${MediaArgNames.description}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <SelectField
                labelName={MediaArgNames.mediaCategoryId}
                inputName={MediaArgs.mediaCategoryId}
                loadData={loadMediaCategories}
                CreateModalAction={CategoryCreateModalAction}
                selectData={categories?.map((item) => ({
                  name: item.name,
                  value: item.id,
                }))}
              />
            </div>

            <Actions />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalUpdateMedia;

// const validationSchema = Yup.object().shape({
//   name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
// });

const CategoryCreateModalAction = ({ loadData }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) {
      loadData();
    }
  }, [open]);
  return (
    <>
      <div className="p-1">
        <Button outline icon={<FiPlus />} onClick={() => setOpen(!open)} />
      </div>
      {open && <ModalMediaCategory {...{ open, setOpen }} />}
    </>
  );
};
