const apiHost='https://staging.chinmayamission.com';

export default{
    async fetchInitialTweets(){
        try {
            const response = await fetch(apiHost+'/wp-json/wp/v2/tweet');
            const responseJson = await response.json();
            return responseJson;
          } catch (error) {
            console.error(error);
          }
    },

    async fetchTweetsSearchResults(searchTerm){
     try {
         const response = await fetch(apiHost+'/wp-json/wp/v2/tweet2?searchTerm='+searchTerm);
         const responseJson = await response.json();
         return responseJson;
       } catch (error) {
         console.error(error);
       }
    },

};
