import { ProbremTab } from '@/components/problem-tab';
import { TestTab } from '@/components/test-tab';
import { CodeTab } from '@/components/code-tab';
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from '@/components/ui/resizable';
import { getAuthToken } from '@/lib/get-auth-token';
import { InitialCodeUseCase } from '@/usecases/initial-code-usecase';
import { InitialCode } from '@/domain/entities/initial-code';
import { ApiInitialCodeRepository } from '@/infrastructure/initial-code/initial-code-repository';
import { SupportedLanguageKey } from '@/domain/entities/language';

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const authToken = await getAuthToken();

  const initialCodeUseCase = new InitialCodeUseCase(
    new ApiInitialCodeRepository(authToken)
  );
  const initialCodesResponse = await initialCodeUseCase.fetchInitialCodes({
    problemId: (await params).id,
  });
  const initialCodes: InitialCode[] = initialCodesResponse.isOk()
    ? initialCodesResponse.value
    : [];
  const initialCodeRecord: Partial<Record<SupportedLanguageKey, string>> = {};
  initialCodes.forEach(
    (initialCode) =>
      (initialCodeRecord[initialCode.language.key] = initialCode.codeText)
  );

  return (
    <ResizablePanelGroup
      autoSaveId='submissions-1'
      direction='horizontal'
      className='px-2.5 pb-2.5 min-w-100 min-h-100'
    >
      <ResizablePanel defaultSize={30} className='min-w-40'>
        <ProbremTab problemId={(await params).id} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70} className='min-w-60'>
        <ResizablePanelGroup autoSaveId='submissions-2' direction='vertical'>
          <ResizablePanel defaultSize={50} className='min-h-60'>
            <CodeTab initialCodes={initialCodeRecord} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50} className='min-h-40'>
            <TestTab />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
