import { DashboardLayout, DashboardLayoutContent } from "@/components/layout";
import { FormAddPost } from "@/components/pages";
import React from "react";

export default function NewPostPage() {
  return (
    <DashboardLayout>
      <DashboardLayoutContent title="Add post">
        <FormAddPost />
      </DashboardLayoutContent>
    </DashboardLayout>
  );
}
