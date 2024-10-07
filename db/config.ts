import { defineDb, defineTable, column } from 'astro:db';

// https://astro.build/db/config
export default defineDb({
  tables: {
    Users : defineTable({
      columns: {
        email: column.text({primaryKey: true}),
        fullName: column.text(),
        password: column.text({optional: true}),
      }
    }),
  }
});
