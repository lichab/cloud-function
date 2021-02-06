var app = new Vue({
  el: '#app',
  data: {
    requests: [],
  },
  mounted() {
    const ref = firebase.firestore().collection('requests');

    ref.onSnapshot(snapshots => {
      let requests = [];

      snapshots.forEach(document => {
        requests.push({
          ...document.data(),
          id: document.id,
        });
      });

      this.requests = requests;
    });
  },
});
