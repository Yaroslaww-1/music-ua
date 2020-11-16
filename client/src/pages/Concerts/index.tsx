import React from 'react';

import PageComponent from 'src/components/Page';
import Subscribe from 'src/components/Subscribe';
import Footer from 'src/components/Footer';
import Filter from './containers/Filter';
import PageNameSection from './components/PageNameSection';
import EventsSection from './containers/EventsSection';

const Concerts: React.FC = () => {
  return (
    <PageComponent>
      <PageNameSection />
      <Filter />
      <EventsSection />
      <Subscribe onSubscribe={() => {}} />
      <Footer />
    </PageComponent>
  );
};

export default Concerts;