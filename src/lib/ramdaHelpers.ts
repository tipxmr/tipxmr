import { assoc } from "ramda";

export const constructRequestBodyFromForm = (
  formData: any,
  userId?: string
) => {
  // TODO do we need to further validate user input?
  let updateData = {};

  // TODO rework with filter and map => make more generic
  for (const pair of formData.entries()) {
    if (pair.at(1) === "") {
      // skip the value if there was nothing entered
      continue;
    }
    updateData = assoc(pair[0], Number(pair[1]), updateData);
  }

  return {
    streamer: userId,
    data: {
      ...updateData,
    },
  };
};
