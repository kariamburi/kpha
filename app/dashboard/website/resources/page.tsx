import { prisma } from "@/lib/prisma";
import { deleteResource, saveResource } from "./actions";
import ResourcesClient from "./ResourcesClient";

export default async function AdminResourcesPage() {
  const resources = await prisma.resource.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <ResourcesClient
      resources={resources}
      saveResource={saveResource}
      deleteResource={deleteResource}
    />
  );
}