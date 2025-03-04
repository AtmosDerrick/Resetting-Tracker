import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "",
    partner: "",
    beneficiary_community: "",
    amount: 0,
    description: "",
  },
];

const projectSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<any>) => {
      const { id, name, partner, beneficiary_community, amount, description } =
        action.payload;
      state.push({
        id,
        name,
        partner,
        beneficiary_community,
        amount,
        description,
      });
    },
    deleteProject: (state, action: PayloadAction<any>) => {
      const { id } = action.payload;
      return state.filter((project: any) => project.id !== id);
    },
    editProject: (state, action: PayloadAction<any>) => {
      const { id, name, partner, beneficiary_community, amount, description } =
        action.payload;
      const project = state.find((project: any) => project.id === id);
      if (project) {
        project.name = name;
        project.partner = partner;
        project.beneficiary_community = beneficiary_community;
        project.amount = amount;
        project.description = description;
      }
    },
    getAllProjects: (state) => {
      return state;
    },
  },
});

export const { addProject, deleteProject, editProject, getAllProjects } =
  projectSlice.actions;

export default projectSlice.reducer;
