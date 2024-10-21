export interface dropdownChildrenVoiceTurboType {
  label: string;
  canBeSelected: boolean;
  index: string;
  assistantId: string;
}

export type dropdownOptionsVoiceTurboType =
  | {
      label: string;
      canBeSelected: boolean;
      children: dropdownChildrenVoiceTurboType[]; // Element has children
      hasBorder: boolean;
      firstToHasBorder: boolean;
      index: string;
      // subtitle: string;
      assistantId?: never; // assistantId is not allowed when there are children
    }
  | {
      label: string;
      canBeSelected: boolean;
      hasBorder: boolean;
      firstToHasBorder: boolean;
      index: string;
      // subtitle: string;
      assistantId: string; // assistantId is required when there are no children
      children?: never; // children is not allowed when there's an assistantId
    };
// this is the dropdown options for the voice turbo model , the children are the sub menues and there is where you insert the assistant id , in case you want to have an item that doesn't have children then you MUST NOT add children field and add assistantId field instead
export const turboDropdownOptions: dropdownOptionsVoiceTurboType[] = [
  // {
  //   label: "Model 1",
  //   index: "model_1",
  //   canBeSelected: true,
  //   // assistantId: "c3728d2c-a127-4da3-85f1-08932aa3008c",
  //   children: [
  //     {
  //       assistantId: "c3728d2c-a127-4da3-85f1-08932aa3008c",
  //       canBeSelected: true,
  //       index: "subtitle_1",
  //       label: "Subtitle 1",
  //     },
  //     {
  //       assistantId: "9d85701e-f1a7-4408-a8ce-42f27f04ba42",
  //       canBeSelected: true,
  //       index: "subtitle_2",
  //       label: "Subtitle 2",
  //     },
  //   ],
  //   hasBorder: false,
  //   firstToHasBorder: false,
  //   // subtitle: "great for maintenance",
  // },
  {
    label: "Model 1",
    index: "model_1",
    canBeSelected: true,
    assistantId: "9d85701e-f1a7-4408-a8ce-42f27f04ba42",
    hasBorder: false,
    firstToHasBorder: false,
    // subtitle: "great for safety",
  },
  {
    label: "Model 2",
    index: "model_2",
    canBeSelected: true,
    assistantId: "9d85701e-f1a7-4408-a8ce-42f27f04ba42",
    hasBorder: false,
    firstToHasBorder: false,
    // subtitle: "great for policy",
  },
  {
    label: "Model 3",
    index: "model_3",
    canBeSelected: true,
    assistantId: "9654e065-9d5c-4dd2-a13b-34b2fe319d7e",
    hasBorder: true,
    firstToHasBorder: false,
    // subtitle: "great for rules",
  },
];
