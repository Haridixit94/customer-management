import { useMemo, useState } from 'react'
import './App.css'

const defaultUsername = 'Hari'
const defaultPassword = 'Hari@123'

const startingCustomers = [
  { id: 1, name: 'Olivia Rhye', email: 'olivia.rhye@company.com', phone: '(415) 555-0132' },
  { id: 2, name: 'Phoenix Baker', email: 'phoenix.baker@company.com', phone: '(415) 555-0184' },
  { id: 3, name: 'Lana Steiner', email: 'lana.steiner@company.com', phone: '(415) 555-0126' },
  { id: 4, name: 'Demi Wilkinson', email: 'demi.wilkinson@company.com', phone: '(415) 555-0179' },
  { id: 5, name: 'Candice Wu', email: 'candice.wu@company.com', phone: '(415) 555-0141' },
  { id: 6, name: 'Natali Craig', email: 'natali.craig@company.com', phone: '(415) 555-0168' },
  { id: 7, name: 'Drew Cano', email: 'drew.cano@company.com', phone: '(415) 555-0193' },
  { id: 8, name: 'Orlando Diggs', email: 'orlando.diggs@company.com', phone: '(415) 555-0117' },
]

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="8.8" cy="8.8" r="5.8" />
      <path d="m13.2 13.2 4 4" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 4v12M4 10h12" />
    </svg>
  )
}

function App() {
  const [customers, setCustomers] = useState(startingCustomers)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [customerToDelete, setCustomerToDelete] = useState(null)
  const [formValues, setFormValues] = useState({ name: '', email: '', phone: '' })

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return customers

    return customers.filter(({ name, email, phone }) =>
      [name, email, phone].some((value) => value.toLowerCase().includes(query)),
    )
  }, [customers, search])

  function openAddForm() {
    setEditingCustomer(null)
    setFormValues({ name: '', email: '', phone: '' })
    setFormOpen(true)
  }

  function openEditForm(customer) {
    setEditingCustomer(customer)
    setFormValues({ name: customer.name, email: customer.email, phone: customer.phone })
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
    setEditingCustomer(null)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const customer = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
    }

    if (editingCustomer) {
      setCustomers((current) =>
        current.map((item) => (item.id === editingCustomer.id ? { ...item, ...customer } : item)),
      )
    } else {
      setCustomers((current) => [{ id: Date.now(), ...customer }, ...current])
    }

    closeForm()
  }

  function confirmDelete() {
    setCustomers((current) => current.filter((customer) => customer.id !== customerToDelete.id))
    setCustomerToDelete(null)
  }

  function handleLogin(event) {
    event.preventDefault()
    if (username === defaultUsername && password === defaultPassword) {
      setIsAuthenticated(true)
      setLoginError('')
      setUsername('')
      setPassword('')
    } else {
      setLoginError('Invalid username or password')
    }
  }

  function handleLogout() {
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
    setLoginError('')
  }

  if (!isAuthenticated) {
    return (
      <main className="login-page">
        <section className="login-card" aria-labelledby="login-title">
          <a className="brand login-brand" href="/" aria-label="Northstar home">
            <span className="brand-mark">n</span>
            <span>northstar</span>
          </a>
          <div className="login-heading">
            <h1 id="login-title">Welcome back</h1>
            <p>Sign in to your customer workspace.</p>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <label className="form-field">
              <span>Username</span>
              <input
                autoComplete="off"
                autoFocus
                required
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value)
                  setLoginError('')
                }}
                placeholder="Enter your username"
              />
            </label>
            <label className="form-field">
              <span>Password</span>
              <input
                autoComplete="new-password"
                required
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setLoginError('')
                }}
                placeholder="Enter your password"
                aria-describedby={loginError ? 'login-error' : undefined}
              />
            </label>
            {loginError && <p className="login-error" id="login-error" role="alert">{loginError}</p>}
            <button className="primary-button login-button" type="submit">Login</button>
          </form>
          <p className="login-footer">Customer Management</p>
        </section>
      </main>
    )
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="Northstar home">
          <span className="brand-mark">n</span>
          <span>northstar</span>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <nav>
          <a className="nav-item" href="#customers" aria-current="page">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="7" cy="6" r="3" />
              <path d="M1.8 16c.3-2.8 2.2-4.3 5.2-4.3s4.9 1.5 5.2 4.3M14 4.5a2.8 2.8 0 0 1 0 5.4m1 2c2 .5 3 1.8 3.2 4.1" />
            </svg>
            Customers
            <span className="nav-count">{customers.length}</span>
          </a>
        </nav>
        <div className="sidebar-bottom">
          <div className="profile-avatar">JD</div>
          <div>
            <div className="profile-name">Jordan Davis</div>
            <div className="profile-role">Workspace admin</div>
          </div>
          <button className="more-button" type="button" aria-label="Profile options">···</button>
        </div>
      </aside>

      <main className="main-content" id="customers">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> Customers</div>
          <div className="topbar-actions">
            <div className="topbar-note"><span className="status-dot" /> Local demo data</div>
            <button className="logout-button" type="button" onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <section className="page-content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">DIRECTORY</div>
              <h1>Customers</h1>
              <p className="page-description">Keep track of your customer contacts all in one place.</p>
            </div>
            <button className="primary-button" type="button" onClick={openAddForm}>
              <PlusIcon />
              Add customer
            </button>
          </div>

          <section className="summary-card" aria-label="Customer summary">
            <div className="summary-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="9" cy="8" r="3.3" />
                <path d="M2.5 19c.3-3.1 2.6-4.8 6.5-4.8s6.2 1.7 6.5 4.8M17 5.5a3.1 3.1 0 0 1 0 6m1 2.7c2.2.6 3.4 2.2 3.5 4.8" />
              </svg>
            </div>
            <div className="summary-copy">
              <span>Total customers</span>
              <strong>{customers.length}</strong>
            </div>
            <div className="summary-divider" />
            <p>Your customer list is up to date.</p>
          </section>

          <section className="directory-card" aria-label="Customer directory">
            <div className="directory-toolbar">
              <div>
                <h2>All customers <span className="count-pill">{customers.length}</span></h2>
                <p>A list of everyone in your directory.</p>
              </div>
              <label className="search-field">
                <SearchIcon />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search customers"
                  aria-label="Search customers"
                />
                <kbd>/</kbd>
              </label>
            </div>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email address</th>
                    <th scope="col">Phone number</th>
                    <th scope="col"><span className="visually-hidden">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer, index) => (
                    <tr key={customer.id}>
                      <td>
                        <div className="customer-name">
                          <span className={`customer-avatar avatar-${index % 6}`}>
                            {customer.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('')}
                          </span>
                          <span className="name-text">{customer.name}</span>
                        </div>
                      </td>
                      <td><a className="contact-link" href={`mailto:${customer.email}`}>{customer.email}</a></td>
                      <td><a className="contact-link" href={`tel:${customer.phone.replace(/[^\d+]/g, '')}`}>{customer.phone}</a></td>
                      <td>
                        <div className="row-actions">
                          <button type="button" onClick={() => openEditForm(customer)} aria-label={`Edit ${customer.name}`}>
                            Edit
                          </button>
                          <button
                            className="delete-action"
                            type="button"
                            onClick={() => setCustomerToDelete(customer)}
                            aria-label={`Delete ${customer.name}`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredCustomers.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon"><SearchIcon /></div>
                  <h3>{customers.length === 0 ? 'No customers yet' : 'No customers found'}</h3>
                  <p>
                    {customers.length === 0
                      ? 'Add a customer to start building your directory.'
                      : 'Try another name, email address, or phone number.'}
                  </p>
                  {customers.length === 0 && (
                    <button className="primary-button" type="button" onClick={openAddForm}>
                      <PlusIcon />
                      Add customer
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="table-footer">
              Showing <strong>{filteredCustomers.length}</strong> of <strong>{customers.length}</strong> customers
            </div>
          </section>
          <footer className="page-footer">Changes are kept in memory and reset when you refresh.</footer>
        </section>
      </main>

      {formOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && closeForm()}>
          <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="form-title">
            <div className="modal-heading">
              <div>
                <h2 id="form-title">{editingCustomer ? 'Edit customer' : 'Add customer'}</h2>
                <p>{editingCustomer ? 'Update this customer’s contact information.' : 'Add a new contact to your directory.'}</p>
              </div>
              <button className="modal-close" type="button" onClick={closeForm} aria-label="Close dialog">×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <label className="form-field">
                <span>Name <b>*</b></span>
                <input
                  autoFocus
                  required
                  maxLength={100}
                  value={formValues.name}
                  onChange={(event) => setFormValues({ ...formValues, name: event.target.value })}
                  placeholder="e.g. Alex Morgan"
                />
              </label>
              <label className="form-field">
                <span>Email address <b>*</b></span>
                <input
                  required
                  type="email"
                  maxLength={254}
                  value={formValues.email}
                  onChange={(event) => setFormValues({ ...formValues, email: event.target.value })}
                  placeholder="alex@company.com"
                />
              </label>
              <label className="form-field">
                <span>Phone number <b>*</b></span>
                <input
                  required
                  type="tel"
                  maxLength={30}
                  value={formValues.phone}
                  onChange={(event) => setFormValues({ ...formValues, phone: event.target.value })}
                  placeholder="(555) 123-4567"
                />
              </label>
              <div className="modal-actions">
                <button className="secondary-button" type="button" onClick={closeForm}>Cancel</button>
                <button className="primary-button" type="submit">
                  {editingCustomer ? 'Save changes' : 'Add customer'}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {customerToDelete && (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setCustomerToDelete(null)}>
          <section className="modal-card confirm-card" role="alertdialog" aria-modal="true" aria-labelledby="delete-title">
            <div className="modal-heading">
              <div>
                <h2 id="delete-title">Delete customer?</h2>
                <p><strong>{customerToDelete.name}</strong> will be removed from your directory. This can’t be undone.</p>
              </div>
              <button className="modal-close" type="button" onClick={() => setCustomerToDelete(null)} aria-label="Close dialog">×</button>
            </div>
            <div className="modal-actions">
              <button className="secondary-button" type="button" onClick={() => setCustomerToDelete(null)}>Cancel</button>
              <button className="danger-button" type="button" onClick={confirmDelete}>Delete customer</button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
