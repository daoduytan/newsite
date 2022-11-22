import { DashboardLayout, DashboardLayoutContent } from "@/components/layout";
import { FormPost } from "@/components/pages";
import React from "react";

export default function NewPostPage() {
  return (
    <DashboardLayout>
      <DashboardLayoutContent title="Add post">
        <FormPost />
      </DashboardLayoutContent>
    </DashboardLayout>
  );
}
