import { createAction } from "@reduxjs/toolkit";
import { ApiActionPayloadUsers } from "../models/Main.model";

export const apiCallBeganUsers =
  createAction<ApiActionPayloadUsers>("api/callBegan");
