import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse our stunning collection of South African Black Mastiff photos. See the magnificent breed that represents strength, loyalty, and elegance.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
