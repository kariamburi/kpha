import { permanentRedirect } from "next/navigation";

export default function AboutPage() {
    permanentRedirect("/about/who-we-are");
}