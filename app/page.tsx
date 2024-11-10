"use client";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Header } from "./layout/header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProbremTab } from "./components/problem-tab";
import { TestTab } from "./components/test-tab";
import { CodeTab } from "./components/code-tab";

class Person {
  name: string = "";
  age: number = 0; 
  addr: string = "";

  constructor (name: string, age: number, addr: string) {
    this.name = name;
    this.age = age;
    this.addr = addr;
  }
}

const samplePersons: Person[] = [];
samplePersons.push(new Person("aさん", 14, "kobe"));
samplePersons.push(new Person("bさん", 15, "Kyoto"));
samplePersons.push(new Person("cさん", 25, "Nagoya"));
samplePersons.push(new Person("dさん", 32, "Osaka"));

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col gap-2 items-center sm:items-start">
        <Header />
        <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-2">
          <ProbremTab />
          <CodeTab />
          <TestTab />
        </div>
      </main>
  );
}
