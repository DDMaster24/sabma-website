import { prisma } from "@/lib/prisma";
import GalleryClient from "./GalleryClient";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Gallery",
  description:
    "Explore our collection of stunning South African Black Mastiffs.",
};

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
  });

  // Serialize for client component (strip Date objects and extra fields)
  const serializedImages = images.map((img) => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
    caption: img.caption,
  }));

  if (serializedImages.length === 0) {
    return (
      <>
        <section className="relative py-24 lg:py-32 mesh-spotlight overflow-hidden">
          <div className="container-custom relative">
            <div className="max-w-3xl">
              <span className="label-micro mb-4 block">Our Dogs</span>
              <h1 className="heading-display text-cream mb-6">
                Photo <span className="text-gradient-amber">Gallery</span>
              </h1>
            </div>
          </div>
        </section>
        <section className="section-padding bg-noir">
          <div className="container-custom text-center py-16">
            <p className="text-stone-500 text-lg">No gallery images to display at this time. Check back soon!</p>
          </div>
        </section>
      </>
    );
  }

  return <GalleryClient images={serializedImages} />;
}
