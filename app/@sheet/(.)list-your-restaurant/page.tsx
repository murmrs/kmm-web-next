import ListYourRestaurantForm from "@/components/list-your-restaurant-form";
import PageSheet from "@/components/page-sheet";
import { DecorativeLink } from "@/components/ui/button";

const ListYourRestaurant = () => {
  return (
    <PageSheet hideCloseButton={true}>
      <div className="h-full p-4 flex flex-col gap-8 overflow-y-auto">
        <div className="mb-2 flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M3 10V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v3M3 10v7a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-7M3 10h18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 21v-4a4 4 0 0 1 8 0v4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">List Your Restaurant</h2>
          <p className="text-muted-foreground max-w-xl">
            Ready to reach new diners and showcase your menu? Fill out the form
            below to get started with Know My Menu. Our team will review your
            submission and reach out to help you complete your listing.
          </p>
          <DecorativeLink
            href="/about"
            // className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Learn more about Know My Menu
          </DecorativeLink>
        </div>
        <div className="bg-muted rounded-lg shadow-sm p-6 max-w-2xl mx-auto w-full">
          <ul className="list-disc list-inside text-left text-sm text-muted-foreground mb-6 space-y-1">
            <li>Highlight your unique menu, dietary options, and amenities.</li>
            <li>
              Get discovered by food lovers searching for places like yours.
            </li>
            <li>
              Our team will guide you through the next steps after you submit.
            </li>
          </ul>
          <ListYourRestaurantForm />
        </div>
      </div>
    </PageSheet>
  );
};

export default ListYourRestaurant;
