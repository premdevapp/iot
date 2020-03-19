import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import App from "containers/App";
import IntlProvider from "containers/IntlProvider";
import { initialState, defaultStore } from "../constants/index";

describe("containers/App", () => {
  it("renders App without auth", () => {
    const wrapper = mount(
      <Provider store={defaultStore}>
        <IntlProvider store={defaultStore}>
          <MemoryRouter initialEntries={["/"]} keyLength={0}>
            <App />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  const stateWithAuth = {
    ...initialState,
    auth: {
      isAuth: true,
      username: null,
      password: null,
      showError: true,
    },
  };
  it("renders App with auth in /", () => {
    const store = configureStore([thunk])(stateWithAuth);
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider store={store}>
          <MemoryRouter initialEntries={["/"]} keyLength={0}>
            <App />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("renders App with auth in /foo", () => {
    const wrapper = mount(
      <Provider store={defaultStore}>
        <IntlProvider store={defaultStore}>
          <MemoryRouter initialEntries={["/foo"]} keyLength={0}>
            <App />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("renders App with auth in /things", () => {
    const store = configureStore([thunk])(stateWithAuth);
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider store={store}>
          <MemoryRouter initialEntries={["/things"]} keyLength={0}>
            <App />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("renders App with auth in /stats", () => {
    const store = configureStore([thunk])(stateWithAuth);
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider store={store}>
          <MemoryRouter initialEntries={["/stats"]} keyLength={0}>
            <App />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("renders App in error state", () => {
    const state = {
      ...initialState,
      auth: {
        isAuth: true,
        username: "username",
        password: "password",
        showError: true,
      },
      request: {
        pending: 1,
        statusCode: null,
        error: new Error(),
      },
    };
    const store = configureStore([thunk])(state);
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider store={store}>
          <MemoryRouter initialEntries={["/stats"]} keyLength={0}>
            <App />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
