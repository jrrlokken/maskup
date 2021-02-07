import { PAGINATION_QUERY } from '../components/Pagination';

const paginationField = () => {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      const items = existing
        .slice(skip, skip + first)
        .filter((x) => x);

      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        return;
      }
      if (items.length) {
        return items;
      }
      return false;
    },

    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}

export default paginationField;