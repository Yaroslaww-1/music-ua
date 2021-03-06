import React from 'react';

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';

import FilterDate from 'src/components/Filter/Filters/FilterDate';
import FilterPlace from 'src/components/Filter/Filters/FilterPlace';
import FilterSection from 'src/components/Filter/FilterSection';
import FilterStyles from 'src/components/Filter/Filters/FilterStyle';
import FilterPopularRecent from 'src/components/Filter/Filters/FilterPopularRecent';
import { FilterState } from './redux/reducer';
import { fetchPlaces, fetchStyles } from './redux/actions';
import { IEventFilter, PopularRecentFilter } from 'src/api/services/event.service';
import { useFilter } from 'src/common/hooks/use-filter';
import { fetchEvents, paginationActions } from '../EventsSection/redux/actions';
import { addDaysToDate } from 'src/common/date/date.helper';

const filterSelector = createSelector(
  (state: RootState) => state.concerts.filter.state,
  (state: FilterState) => state,
);

const FilterContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { availableStyles, availablePlaces } = useSelector(filterSelector);

  const parseFilterUrlParams = (parsedFilterFromUrl: IEventFilter): IEventFilter => {
    return {
      date: parsedFilterFromUrl.date && {
        from: new Date(parsedFilterFromUrl.date.from),
        to: new Date(parsedFilterFromUrl.date.to),
      },
      stylesIds: ([] as number[]).concat(parsedFilterFromUrl.stylesIds || []),
      placesIds: ([] as number[]).concat(parsedFilterFromUrl.placesIds || []),
      offset: parsedFilterFromUrl.offset,
      limit: parsedFilterFromUrl.limit,
      type: parsedFilterFromUrl.type,
    };
  };

  const { filter, updateFilterUrlParam } = useFilter<IEventFilter>({
    fetchItems: () => {
      dispatch(fetchEvents.request());
      dispatch(paginationActions.reset());
    },
    parseFilter: parseFilterUrlParams,
  });

  const {
    date: { from = new Date(), to = addDaysToDate(new Date(), 1000) } = {},
    stylesIds = [],
    placesIds = [],
    type,
  } = filter;

  React.useEffect(() => {
    dispatch(fetchStyles.request());
    dispatch(fetchPlaces.request());
    if (!type) {
      updateFilterUrlParam('type')(PopularRecentFilter.popular);
    }
  }, []);

  return (
    <FilterSection>
      <FilterDate from={from} to={to} onSelect={updateFilterUrlParam('date')} />
      <FilterStyles
        styles={availableStyles}
        selectedStyles={availableStyles.filter((style) => stylesIds.includes(style.id))}
        onSelect={(styles) => updateFilterUrlParam('stylesIds')(styles.map((style) => style.id))}
      />
      <FilterPlace
        places={availablePlaces}
        selectedPlaces={availablePlaces.filter((place) => placesIds.includes(place.id))}
        onSelect={(places) => updateFilterUrlParam('placesIds')(places.map((place) => place.id))}
      />
      <FilterPopularRecent
        preSelected={type}
        onPopularSelect={() => updateFilterUrlParam('type')(PopularRecentFilter.popular)}
        onRecentSelect={() => updateFilterUrlParam('type')(PopularRecentFilter.recent)}
      />
    </FilterSection>
  );
};

export default FilterContainer;
