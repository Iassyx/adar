import { defineModule } from 'direct-vuex';

import { localActionContext, localGetterContext } from '@/store';
import { Module } from '@/store/consts';

import mutations from './mutations';
import state from './state';
import getters from './getters';
import actions from './actions';

const web3 = defineModule({
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
});

const web3GetterContext = (args: [any, any, any, any]) => localGetterContext(args, Module.Web3, web3);
const web3ActionContext = (context: any) => localActionContext(context, Module.Web3, web3);

export { web3GetterContext, web3ActionContext };
export default web3;
