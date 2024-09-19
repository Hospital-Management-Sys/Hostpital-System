import React from 'react';

const EventCard = ({ event }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2 text-[#FF9E9E]">{event.title}</h3>
      <p className="text-gray-600 mb-2">{event.date}</p>
      <p className="text-gray-700">{event.description}</p>
    </div>
    <div className="bg-[#C0EEE4] p-4">
      {/* <a href="#" className="text-[#FF9E9E] font-bold hover:underline">Learn More</a> */}
    </div>
  </div>
);

const EventsSection = () => {
  const events = [
    {
      title: "Teddy Bear Clinic",
      date: "September 15, 2024",
      description: "Bring your favorite stuffed animal for a check-up and learn about doctor visits!"
    },
    {
      title: "Healthy Eating Fun Day",
      date: "October 2, 2024",
      description: "Join us for games, activities, and tasty treats that are good for you!"
    },
    {
      title: "Hospital Safari Adventure",
      date: "October 20, 2024",
      description: "Explore different hospital departments in this fun, animal-themed event!"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Upcoming Fun Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;