import pack from './pack';
import Mock, { Random } from 'mockjs';

module.exports = function (router) {
  router.post('/getUser', (req, res) => {
    setTimeout(() => res.json(pack(Random.cname())), 0);
  });
}
