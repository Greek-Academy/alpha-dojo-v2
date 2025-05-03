'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useParams, usePathname } from 'next/navigation';
import { Play, Upload } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/react-redux';
import { submitSubmission } from '@/lib/features/submission/submission-slice';
import { SubmissionToCreate } from '@/domain/entities/submission';
import { languageKeyToLanguage } from '@/domain/repositories/language-repository';

export type HeaderButtonsProps = React.ButtonHTMLAttributes<HTMLDivElement>;

export function HeaderButtons(props: HeaderButtonsProps) {
  const pathname = usePathname();
  const buttonEnabledPages = /^\/submissions\/\w+\/edit$/;

  const params = useParams<{ id: string }>();

  const user = useAppSelector((state) => state.user);
  const submission = useAppSelector((state) => state.submission.newSubmission);
  const dispatch = useAppDispatch();

  function runButtonHandler() {
    alert('WIP');
  }

  function submitButtonHandler() {
    if (user.id === undefined) {
      // FIXME: エラー時の処理
      return;
    }
    const submissionToCreate = new SubmissionToCreate(
      user.id,
      params.id,
      languageKeyToLanguage(submission.codeLanguageKey),
      submission.codeText
    );
    dispatch(submitSubmission(submissionToCreate));
  }

  return (
    <div className={cn('flex gap-2', props.className)} {...props}>
      {buttonEnabledPages.test(pathname) && (
        <>
          <Button onClick={runButtonHandler} variant='outline'>
            <Play /> Run
          </Button>
          <Button onClick={submitButtonHandler}>
            <Upload /> Submit
          </Button>
        </>
      )}
    </div>
  );
}
