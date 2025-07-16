import PageSheet from "@/components/page-sheet";
import Details from "@/components/restaurants/details";
import { Button } from "@/components/ui/button";
import { fetchRestaurant } from "@/lib/data";
import { MoveLeft } from "lucide-react";

const RestaurantModal = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;
  const data = await fetchRestaurant(id);
  return (
    <PageSheet hideCloseButton={true}>
      <Details
        className="overflow-y-auto"
        location={data || undefined}
        displayBackButton={true}
      />
    </PageSheet>
  );
};

export default RestaurantModal;
