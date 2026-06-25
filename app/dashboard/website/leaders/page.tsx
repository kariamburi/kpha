import { prisma } from "@/lib/prisma";
import { deleteLeader, saveLeader } from "./actions";
import LeadersClient from "./LeadersClient";

export default async function AdminLeadersPage() {
    const leaders = await prisma.leader.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return (
        <LeadersClient
            leaders={leaders}
            saveLeader={saveLeader}
            deleteLeader={deleteLeader}
        />
    );
}