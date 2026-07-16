"use client";

import { 
  ArrowUpRight, ArrowDownRight, Users, DollarSign, 
  ShoppingCart, Activity, MoreVertical, CreditCard, 
  Package, MapPin
} from "lucide-react";

const metrics = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", isPositive: true, icon: DollarSign, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
  { title: "Active Users", value: "2,350", change: "+15.2%", isPositive: true, icon: Users, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10" },
  { title: "New Orders", value: "12,234", change: "-4.1%", isPositive: false, icon: ShoppingCart, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10" },
  { title: "Conversion Rate", value: "4.35%", change: "+2.4%", isPositive: true, icon: Activity, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" }
];

const recentOrders = [
  { id: "#ORD-001", customer: "Michael Scott", product: "MacBook Pro 16\"", date: "Oct 24, 2025", amount: "$2,499.00", status: "Completed" },
  { id: "#ORD-002", customer: "Dwight Schrute", product: "Beet Seeds (100x)", date: "Oct 24, 2025", amount: "$45.00", status: "Processing" },
  { id: "#ORD-003", customer: "Jim Halpert", product: "Wireless Mouse", date: "Oct 23, 2025", amount: "$120.00", status: "Completed" },
  { id: "#ORD-004", customer: "Pam Beesly", product: "Wacom Cintiq 22", date: "Oct 23, 2025", amount: "$1,199.00", status: "Shipped" },
  { id: "#ORD-005", customer: "Ryan Howard", product: "Business Cards", date: "Oct 22, 2025", amount: "$25.00", status: "Failed" }
];

const topProducts = [
  { name: "iPhone 15 Pro Max", category: "Electronics", sales: 1240, revenue: "$1.4M", trend: "+12%" },
  { name: "AirPods Pro 2", category: "Audio", sales: 3450, revenue: "$860K", trend: "+8%" },
  { name: "iPad Air", category: "Electronics", sales: 980, revenue: "$580K", trend: "-2%" },
  { name: "Magic Keyboard", category: "Accessories", sales: 1420, revenue: "$420K", trend: "+15%" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-card border border-border text-foreground rounded-lg hover:bg-muted font-medium text-sm transition-colors shadow-sm">
            Export Data
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors shadow-sm">
            Create Report
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${metric.bg}`}>
                  <Icon className={`size-5 ${metric.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${metric.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                  {metric.isPositive ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
                  {metric.change}
                </div>
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm font-medium">{metric.title}</h3>
                <p className="text-2xl font-bold text-foreground mt-1">{metric.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart Area (Mockup) */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-foreground">Revenue Overview</h2>
              <p className="text-sm text-muted-foreground">Monthly revenue and sales performance</p>
            </div>
            <select className="bg-muted border border-border text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-foreground font-medium">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
          </div>
          
          <div className="h-72 w-full flex items-end justify-between gap-2">
            {/* CSS Bar Chart Mockup */}
            {[45, 60, 35, 80, 55, 90, 70, 85, 40, 65, 50, 75].map((val, i) => (
              <div key={i} className="w-full flex flex-col justify-end group">
                <div className="w-full bg-blue-100 dark:bg-blue-500/20 rounded-t-sm transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-500/30" style={{ height: `${val}%` }}>
                  <div className="w-full bg-blue-500 rounded-t-sm transition-all duration-300 group-hover:bg-blue-600" style={{ height: `${val * 0.7}%` }} />
                </div>
                <div className="text-center text-xs text-muted-foreground mt-2 font-medium">
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">Top Products</h2>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">View All</button>
          </div>
          
          <div className="space-y-5">
            {topProducts.map((prod, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
                  <Package className="size-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-foreground truncate">{prod.name}</h3>
                  <p className="text-xs text-muted-foreground">{prod.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{prod.revenue}</p>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">{prod.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-lg font-bold text-foreground">Recent Orders</h2>
              <p className="text-sm text-muted-foreground">Latest transactions from your store</p>
            </div>
            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
              <MoreVertical className="size-5" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold border-b border-border">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                    <td className="px-6 py-4 text-muted-foreground">{order.customer}</td>
                    <td className="px-6 py-4 text-muted-foreground">{order.product}</td>
                    <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                    <td className="px-6 py-4 font-medium text-foreground">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-md border ${
                        order.status === 'Completed' ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200/50 dark:border-green-500/20' :
                        order.status === 'Processing' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200/50 dark:border-blue-500/20' :
                        order.status === 'Shipped' ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200/50 dark:border-purple-500/20' :
                        'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200/50 dark:border-red-500/20'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Transfer Widget */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Quick Transfer</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">Recent Contacts</label>
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group">
                    <div className="size-12 rounded-full bg-muted border-2 border-transparent group-hover:border-blue-500 transition-colors overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=transparent`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">User {i}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">Amount</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</div>
                <input type="text" defaultValue="150.00" className="w-full bg-muted border border-border rounded-xl pl-8 pr-4 py-3 font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">USD</div>
              </div>
            </div>

            <button className="w-full py-3 bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2 mt-2">
              <CreditCard className="size-4" /> Send Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
