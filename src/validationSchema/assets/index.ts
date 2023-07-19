import * as yup from 'yup';

export const assetValidationSchema = yup.object().shape({
  name: yup.string().required(),
  status: yup.string().required(),
  facility_id: yup.string().nullable(),
});
