import { SupportedLanguageKey } from '@/domain/entities/language';
import { SubmissionToCreate } from '@/domain/entities/submission';
import { ApiSubmissionRepository } from '@/infrastructure/submission/submission-repository';
import { getAuthToken } from '@/lib/get-auth-token';
import { SubmissionUseCase } from '@/usecases/submission-usecase';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const submitSubmission = createAsyncThunk(
  'submission/submit',
  async (submission: SubmissionToCreate, { rejectWithValue }) => {
    const authToken = await getAuthToken();
    const submissionRepository = new ApiSubmissionRepository(authToken);
    const submissionUseCase = new SubmissionUseCase(submissionRepository);

    const submissionResponse =
      await submissionUseCase.postSubmission(submission);
    if (submissionResponse.isErr()) {
      return rejectWithValue(
        `${submissionResponse.error.errorCode}: ${submissionResponse.error.message}`
      );
    }

    return { id: submissionResponse.value.id };
  }
);

interface SubmissionState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  newSubmission: {
    codeText: string;
    codeLanguageKey: SupportedLanguageKey;
  };
  submissionResponse?: {
    id: string;
  };
}

const initialState: SubmissionState = {
  status: 'idle',
  newSubmission: {
    codeText: '',
    codeLanguageKey: /* 既定の言語 */ 'TYPESCRIPT',
  },
};

export const submissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    setCodeText: (state, action: PayloadAction<string>) => {
      state.newSubmission.codeText = action.payload;
    },
    setCodeLanguage: (state, action: PayloadAction<SupportedLanguageKey>) => {
      state.newSubmission.codeLanguageKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSubmission.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        submitSubmission.fulfilled,
        (
          state,
          action: PayloadAction<SubmissionState['submissionResponse']>
        ) => {
          state.status = 'succeeded';
          state.submissionResponse = action.payload;
          alert('成功！ (画面遷移は未実装)');
        }
      )
      .addCase(submitSubmission.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setCodeText, setCodeLanguage } = submissionSlice.actions;
export default submissionSlice.reducer;
