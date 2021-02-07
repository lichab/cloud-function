var app = new Vue({
  el: '#app',
  data: {
    requests: []
  },
  methods: {
    async upVoteRequest(id) {
      const upVote = firebase.functions().httpsCallable('upVote');

      try {
        await upVote({ id });
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  mounted() {
    const ref = firebase
      .firestore()
      .collection('requests')
      .orderBy('upVotes', 'desc');

    ref.onSnapshot(snapshots => {
      let requests = [];

      snapshots.forEach(document => {
        requests.push({
          ...document.data(),
          id: document.id
        });
      });

      this.requests = requests;
    });
  }
});
