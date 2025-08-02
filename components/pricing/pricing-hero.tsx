export default function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/90 text-white py-20">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Everything You Need.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Stop paying for features you don't use. Get the complete restaurant
            discovery experience with Know My Menu.
          </p>
        </div>
      </div>
    </section>
  );
}
