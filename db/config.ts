import { defineDb, defineTable, column } from 'astro:db';

const Users = defineTable({
  columns: {
    email: column.text({primaryKey: true}),
    fullName: column.text(),
    password: column.text({optional: true}),
  }
})

const Sessions = defineTable({
  columns: {
    sessionId: column.text({primaryKey: true}),
    userId: column.text({references: () => Users.columns.email})
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Users,
    Sessions,
  }
});
