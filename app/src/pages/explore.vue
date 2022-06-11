<script>
import pageControls from '~/components/pageControls.vue'
import btnCircle from '~/components/btnCircle.vue'
import icon from '~/components/icons/icon.vue'
import usersContainer from '~/components/usersContainer.vue'
import { searchUsers } from '~/requests/users'
import { eventBus } from '~/main.js'

export default {
  name: 'explore',
  components: {
    pageControls,
    icon,
    btnCircle,
    usersContainer
  },
  data () {
    return {
      users: [],
      searchTerms: [],
      status: {
        isLoading: false
      }
    }
  },
  methods: {
    test (name) {
      console.log(`${name} was clicked!`)
    },
    async searchUsers (search) {
      this.status.isLoading = true

      try {
        const res = await searchUsers() ?? []
        this.users = res.data

        this.status.isLoading = false
      } catch (error) {
        console.error('Users search error: ', error)
        this.status.isLoading = false
      }
    },
    async usersBasedOnSearchTerms () {
      const { searchTerms } = this
      await this.searchUsers(searchTerms)
    }
  },
  async mounted () {
    // get things started
    await this.usersBasedOnSearchTerms()

    eventBus.on('loggedbackin', async res => {
      await this.usersBasedOnSearchTerms()
    })

    eventBus.on('search', (async res => {
      this.searchTerms = res
      await this.searchUsers(res).catch(err => console.error(err))
    }))
  }
}
</script>

<template>
  <div class="page">
    <pageControls>
      <template v-slot:left><h1>Explore Users</h1></template>
      <template v-slot:right>
        <div class="btn_inline">
          <btnCircle color="trans" title="Search for users" @click="test('Search')">
            <icon name="search" color="text" size="9" sWidth="3" />
          </btnCircle>
          <btnCircle title="Add a new something" @click="test('new something')">
            <icon name="plus" size="6" sWidth="3" />
          </btnCircle>
        </div>
      </template>
    </pageControls>

    <usersContainer :items="users" :isLoading="status.isLoading" />
  </div>
</template>

<style lang="pcss">
  .btn_inline {
    display: flex;

    & .btn_circle {
      flex: 0 0 auto;
    }
  }
</style>
