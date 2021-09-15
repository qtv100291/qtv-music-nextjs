import http from './httpService';

const apiEndpoint = '/articles';

export async function getArticle(articleId){
    const articleDetail = http.get(apiEndpoint + '/' + articleId);
    return articleDetail;
}