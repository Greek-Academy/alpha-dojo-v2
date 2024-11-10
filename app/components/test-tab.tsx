import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardPenLine, FileText, FlaskConical, MonitorCheck, SquareCheckBig, Text } from "lucide-react";

export const TestTab = () => {
    return (
        <Card className="w-full h-full">
            <Tabs defaultValue="testcase" className="w-full h-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="testcase" className="w-full"><SquareCheckBig size="14"/>Test Case</TabsTrigger>
                    <TabsTrigger value="testresult" className="w-full"><MonitorCheck size="14"/>Test Result</TabsTrigger>
                    <TabsTrigger value="lintresult" className="w-full"><Text size="14"/> Lint Result</TabsTrigger>
                </TabsList>
                <div className="h-full">
                    <TabsContent value="testcase" className="h-full bg-white">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>テストケースです</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                ここにテストケースが入ります。
                            </CardContent>
                            
                        </Card>
                    </TabsContent>
                    <TabsContent value="testresult" className="h-full bg-white">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>テスト結果</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                ここにはテスト結果が並びます。
                            </CardContent>
                            
                        </Card>
                    </TabsContent>
                    <TabsContent value="lintresult" className="h-full bg-white">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Solutions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                Linterの結果が出てきます。
                            </CardContent>
                            <CardFooter>
                                Footer...
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </Card>
    );
};
