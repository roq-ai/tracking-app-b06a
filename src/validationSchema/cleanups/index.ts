import * as yup from 'yup';

export const cleanupValidationSchema = yup.object().shape({
  status: yup.string().required(),
  facility_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
