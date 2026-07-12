import { Head, Link, createInertiaApp, router, useForm, usePage } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import createServer from "@inertiajs/react/server";
import { renderToString } from "react-dom/server";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region resources/js/Pages/Auth/ForgotPassword.tsx
var ForgotPassword_exports = /* @__PURE__ */ __exportAll({ default: () => ForgotPassword });
function ForgotPassword() {
	const { status } = usePage().props;
	const { data, setData, post, processing, errors } = useForm({ email: "" });
	function submit(event) {
		event.preventDefault();
		post("/forgot-password");
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Forgot Password" }), /* @__PURE__ */ jsx("main", {
		className: "w-full bg-[#f3f1ec]",
		children: /* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[760px] px-5 py-20 sm:px-10 lg:py-24",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
						children: "Account Access"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-5 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
						children: "Reset Password"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-5 text-base leading-7 text-neutral-600",
						children: "Enter your email and Petra will send a password reset link if the account exists."
					}),
					status && /* @__PURE__ */ jsx("div", {
						className: "mt-8 border border-[#a56437] bg-[#f3f1ec] p-4 text-base leading-7 text-neutral-700",
						children: status
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "mt-8 grid gap-5 border border-[#dad5cb] bg-[#f8f8f6] p-6 sm:p-8",
						children: [/* @__PURE__ */ jsxs("label", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
									children: "Email"
								}),
								/* @__PURE__ */ jsx("input", {
									type: "email",
									value: data.email,
									onChange: (event) => setData("email", event.target.value),
									className: "portal-input",
									autoComplete: "email",
									required: true
								}),
								errors.email && /* @__PURE__ */ jsx("span", {
									className: "text-sm text-red-700",
									children: errors.email
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center gap-4",
							children: [/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: processing,
								className: "button-press focus-copper inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
								children: processing ? "Sending" : "Send reset link"
							}), /* @__PURE__ */ jsx(Link, {
								href: "/login",
								className: "font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-700 hover:text-neutral-950",
								children: "Back to login"
							})]
						})]
					})
				]
			})
		})
	})] });
}
//#endregion
//#region resources/js/Pages/Auth/Login.tsx
var Login_exports = /* @__PURE__ */ __exportAll({ default: () => Login });
function Login() {
	const { data, setData, post, processing, errors } = useForm({
		email: "",
		password: "",
		remember: false
	});
	function submit(event) {
		event.preventDefault();
		post("/login");
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Customer Login" }), /* @__PURE__ */ jsx("main", {
		className: "flex min-h-screen items-center justify-center bg-[#f3f1ec] px-5 py-8 text-neutral-950 sm:px-8 lg:px-10",
		children: /* @__PURE__ */ jsxs("section", {
			className: "grid w-full max-w-[1120px] overflow-hidden border border-[#dad5cb] bg-white shadow-[0_24px_80px_rgba(15,15,15,0.06)] lg:min-h-[560px] lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.8fr)]",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col justify-between gap-12 border-b border-[#dad5cb] bg-[#fbfaf7] p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Link, {
					href: "/",
					className: "focus-copper inline-block font-heading text-[2rem] font-semibold uppercase tracking-[0.22em] text-neutral-950",
					children: "Petra"
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-16 max-w-[560px] lg:mt-20",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
							children: "Customer Portal"
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-5 font-heading text-5xl font-bold uppercase leading-none tracking-[0.08em] text-neutral-950 sm:text-6xl lg:text-7xl",
							children: "Login"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 text-base font-medium leading-7 text-neutral-600 sm:text-lg",
							children: "Access seller and buyer workspace tools for saved equipment, quotes, offers, documents, and account details."
						})
					]
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "grid gap-3 text-sm leading-6 text-neutral-600 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "border border-[#dad5cb] bg-white p-4",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-950",
							children: "Sellers"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2",
							children: "Manage activity, saved equipment, profile details, and future deal workflows."
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "border border-[#dad5cb] bg-white p-4",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-950",
							children: "Buyers"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2",
							children: "Track watched equipment, account details, and portal updates as features come online."
						})]
					})]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "flex items-center bg-white p-7 sm:p-10 lg:p-12",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "grid w-full gap-5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mb-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-heading text-sm font-semibold uppercase tracking-[0.18em] text-[#a56437]",
								children: "Secure Access"
							}), /* @__PURE__ */ jsx("h2", {
								className: "mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
								children: "Sign in"
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
									children: "Email"
								}),
								/* @__PURE__ */ jsx("input", {
									type: "email",
									value: data.email,
									onChange: (event) => setData("email", event.target.value),
									className: "portal-input bg-[#fbfaf7]",
									autoComplete: "email",
									required: true
								}),
								errors.email && /* @__PURE__ */ jsx("span", {
									className: "text-sm text-red-700",
									children: errors.email
								})
							]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
									children: "Password"
								}),
								/* @__PURE__ */ jsx("input", {
									type: "password",
									value: data.password,
									onChange: (event) => setData("password", event.target.value),
									className: "portal-input bg-[#fbfaf7]",
									autoComplete: "current-password",
									required: true
								}),
								errors.password && /* @__PURE__ */ jsx("span", {
									className: "text-sm text-red-700",
									children: errors.password
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center justify-between gap-4",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-3 text-sm font-medium text-neutral-700",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: data.remember,
									onChange: (event) => setData("remember", event.target.checked),
									className: "h-4 w-4 accent-[#a56437]"
								}), "Remember me"]
							}), /* @__PURE__ */ jsx(Link, {
								href: "/forgot-password",
								className: "font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#a56437]",
								children: "Forgot password"
							})]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: processing,
							className: "button-press focus-copper mt-2 inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
							children: processing ? "Signing in" : "Sign in"
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-2 border-t border-[#dad5cb] pt-5 text-base leading-7 text-neutral-600",
							children: [
								"Need portal access?",
								" ",
								/* @__PURE__ */ jsx(Link, {
									href: "/register",
									className: "font-heading font-semibold uppercase tracking-[0.08em] text-neutral-950",
									children: "Register"
								})
							]
						})
					]
				})
			})]
		})
	})] });
}
//#endregion
//#region resources/js/Pages/Auth/Register.tsx
var Register_exports = /* @__PURE__ */ __exportAll({ default: () => Register });
function Register() {
	const { data, setData, post, processing, errors } = useForm({
		name: "",
		email: "",
		phone: "",
		company_name: "",
		user_type: "buyer",
		password: "",
		password_confirmation: ""
	});
	function submit(event) {
		event.preventDefault();
		post("/register");
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Register" }), /* @__PURE__ */ jsx("main", {
		className: "w-full bg-[#f3f1ec]",
		children: /* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[900px] px-5 py-20 sm:px-10 lg:py-24",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
						children: "Customer Portal"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-5 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
						children: "Register"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-5 text-base leading-7 text-neutral-600",
						children: "Create one Petra account and choose whether your primary portal context is seller or buyer. This can be extended later if the client wants fully separate account types."
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "mt-10 grid gap-5 border border-[#dad5cb] bg-[#f8f8f6] p-6 sm:grid-cols-2 sm:p-8",
						children: [
							/* @__PURE__ */ jsx(Field$2, {
								label: "Name",
								error: errors.name,
								children: /* @__PURE__ */ jsx("input", {
									value: data.name,
									onChange: (event) => setData("name", event.target.value),
									className: "portal-input",
									autoComplete: "name",
									required: true
								})
							}),
							/* @__PURE__ */ jsx(Field$2, {
								label: "Email",
								error: errors.email,
								children: /* @__PURE__ */ jsx("input", {
									type: "email",
									value: data.email,
									onChange: (event) => setData("email", event.target.value),
									className: "portal-input",
									autoComplete: "email",
									required: true
								})
							}),
							/* @__PURE__ */ jsx(Field$2, {
								label: "Phone",
								error: errors.phone,
								children: /* @__PURE__ */ jsx("input", {
									value: data.phone,
									onChange: (event) => setData("phone", event.target.value),
									className: "portal-input",
									autoComplete: "tel"
								})
							}),
							/* @__PURE__ */ jsx(Field$2, {
								label: "Company",
								error: errors.company_name,
								children: /* @__PURE__ */ jsx("input", {
									value: data.company_name,
									onChange: (event) => setData("company_name", event.target.value),
									className: "portal-input",
									autoComplete: "organization"
								})
							}),
							/* @__PURE__ */ jsx(Field$2, {
								label: "Portal type",
								error: errors.user_type,
								children: /* @__PURE__ */ jsxs("select", {
									value: data.user_type,
									onChange: (event) => setData("user_type", event.target.value),
									className: "portal-input",
									children: [/* @__PURE__ */ jsx("option", {
										value: "buyer",
										children: "Buyer"
									}), /* @__PURE__ */ jsx("option", {
										value: "seller",
										children: "Seller"
									})]
								})
							}),
							/* @__PURE__ */ jsx("div", {}),
							/* @__PURE__ */ jsx(Field$2, {
								label: "Password",
								error: errors.password,
								children: /* @__PURE__ */ jsx("input", {
									type: "password",
									value: data.password,
									onChange: (event) => setData("password", event.target.value),
									className: "portal-input",
									autoComplete: "new-password",
									required: true
								})
							}),
							/* @__PURE__ */ jsx(Field$2, {
								label: "Confirm password",
								error: errors.password_confirmation,
								children: /* @__PURE__ */ jsx("input", {
									type: "password",
									value: data.password_confirmation,
									onChange: (event) => setData("password_confirmation", event.target.value),
									className: "portal-input",
									autoComplete: "new-password",
									required: true
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: processing,
									className: "button-press focus-copper inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
									children: processing ? "Creating account" : "Create account"
								}), /* @__PURE__ */ jsxs("p", {
									className: "mt-5 text-base leading-7 text-neutral-600",
									children: [
										"Already have access?",
										" ",
										/* @__PURE__ */ jsx(Link, {
											href: "/login",
											className: "font-heading font-semibold uppercase tracking-[0.08em] text-neutral-950",
											children: "Login"
										})
									]
								})]
							})
						]
					})
				]
			})
		})
	})] });
}
function Field$2({ label, error, children }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
				children: label
			}),
			children,
			error && /* @__PURE__ */ jsx("span", {
				className: "text-sm text-red-700",
				children: error
			})
		]
	});
}
//#endregion
//#region resources/js/Pages/Auth/ResetPassword.tsx
var ResetPassword_exports = /* @__PURE__ */ __exportAll({ default: () => ResetPassword });
function ResetPassword({ email, token }) {
	const { data, setData, post, processing, errors } = useForm({
		token,
		email,
		password: "",
		password_confirmation: ""
	});
	function submit(event) {
		event.preventDefault();
		post("/reset-password");
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Set New Password" }), /* @__PURE__ */ jsx("main", {
		className: "w-full bg-[#f3f1ec]",
		children: /* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[760px] px-5 py-20 sm:px-10 lg:py-24",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
						children: "Account Access"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-5 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
						children: "New Password"
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "mt-8 grid gap-5 border border-[#dad5cb] bg-[#f8f8f6] p-6 sm:p-8",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "hidden",
								value: data.token
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: "Email",
								error: errors.email,
								children: /* @__PURE__ */ jsx("input", {
									type: "email",
									value: data.email,
									onChange: (event) => setData("email", event.target.value),
									className: "portal-input",
									autoComplete: "email",
									required: true
								})
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: "Password",
								error: errors.password,
								children: /* @__PURE__ */ jsx("input", {
									type: "password",
									value: data.password,
									onChange: (event) => setData("password", event.target.value),
									className: "portal-input",
									autoComplete: "new-password",
									required: true
								})
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: "Confirm password",
								error: errors.password_confirmation,
								children: /* @__PURE__ */ jsx("input", {
									type: "password",
									value: data.password_confirmation,
									onChange: (event) => setData("password_confirmation", event.target.value),
									className: "portal-input",
									autoComplete: "new-password",
									required: true
								})
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: processing,
								className: "button-press focus-copper inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
								children: processing ? "Saving" : "Save password"
							})
						]
					})
				]
			})
		})
	})] });
}
function Field$1({ label, error, children }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
				children: label
			}),
			children,
			error && /* @__PURE__ */ jsx("span", {
				className: "text-sm text-red-700",
				children: error
			})
		]
	});
}
//#endregion
//#region resources/js/Pages/Contact.tsx
var Contact_exports = /* @__PURE__ */ __exportAll({ default: () => Contact });
var pageTitle$6 = "Contact Petra | Let's Move Something";
var pageDescription$6 = "If you've got equipment to sell or you're trying to source something for a job, reach out. Petra will tell you straight up if we can help or not.";
function Contact({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "ContactPage",
			"@id": `${canonicalUrl}#contact`,
			name: "Contact Petra",
			url: canonicalUrl,
			description: pageDescription$6,
			about: [
				"Used oilfield equipment brokerage",
				"Equipment sourcing",
				"Industrial surplus equipment"
			]
		}, {
			"@type": "BreadcrumbList",
			"@id": `${canonicalUrl}#breadcrumbs`,
			itemListElement: [{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: canonicalUrl.replace(/\/contact$/, "")
			}, {
				"@type": "ListItem",
				position: 2,
				name: "Contact",
				item: canonicalUrl
			}]
		}]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: pageTitle$6,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: pageDescription$6
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "canonical",
				href: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "robots",
				content: "index, follow"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:title",
				content: pageTitle$6
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: pageDescription$6
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:type",
				content: "website"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:url",
				content: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image:alt",
				content: "Oilfield equipment yard represented by Petra brokerage."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: pageTitle$6
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: pageDescription$6
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("script", {
				type: "application/ld+json",
				children: JSON.stringify(structuredData)
			})
		]
	}), /* @__PURE__ */ jsx("main", {
		className: "w-full bg-[#f3f1ec]",
		children: /* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-24",
				children: /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("h1", {
						className: "max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]",
						children: "Let's Move Something"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg",
						children: "If you've got equipment to sell or you're trying to source something for a job, just reach out. We'll tell you straight up if we can help or not."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-10 flex flex-col gap-4 sm:flex-row",
						children: [/* @__PURE__ */ jsx("a", {
							href: "/sell-equipment",
							className: "inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
							children: "Sell Equipment"
						}), /* @__PURE__ */ jsx("a", {
							href: "/request-equipment",
							className: "inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
							children: "Request Equipment"
						})]
					})
				] })
			})
		})
	})] });
}
var equipment_default = {
	heroImage: "/images/petra-equipment-yard-hero.png",
	categories: [
		{
			"name": "Compressors",
			"slug": "compressors",
			"summary": "Natural gas compressor packages, Ariel frames, engine-driven packages, and field-ready compression assets.",
			"count": "Active network"
		},
		{
			"name": "Separators",
			"slug": "separators",
			"summary": "Production separators, test separators, heater treaters, and pressure vessels for oilfield operations.",
			"count": "Field verified"
		},
		{
			"name": "Tank Batteries",
			"slug": "tank-batteries",
			"summary": "Storage tanks, tank battery packages, containment assets, and production-site support equipment.",
			"count": "Regional supply"
		},
		{
			"name": "Pump Packages",
			"slug": "pump-packages",
			"summary": "Pump skids, transfer packages, saltwater disposal support equipment, and production handling assets.",
			"count": "Sourcing ready"
		},
		{
			"name": "Production Equipment",
			"slug": "production-equipment",
			"summary": "Production packages, field equipment groups, and site-ready assets used across active producing regions.",
			"count": "Network category"
		},
		{
			"name": "Processing Equipment",
			"slug": "processing-equipment",
			"summary": "Processing assets, treating equipment, and production support systems for field and yard operations.",
			"count": "Network category"
		},
		{
			"name": "Generators",
			"slug": "generators",
			"summary": "Generator sets, power units, and field power packages for production and industrial sites.",
			"count": "Network category"
		},
		{
			"name": "Drilling Equipment",
			"slug": "drilling-equipment",
			"summary": "Drilling support equipment, surplus packages, and related assets moving through regional sellers.",
			"count": "Network category"
		},
		{
			"name": "Electrical Equipment",
			"slug": "electrical-equipment",
			"summary": "Electrical gear, power distribution assets, and field-ready equipment for industrial operations.",
			"count": "Network category"
		},
		{
			"name": "Pipe & Tubular",
			"slug": "pipe-tubular",
			"summary": "Pipe, tubing, tubular goods, and surplus yard inventory available through regional networks.",
			"count": "Network category"
		},
		{
			"name": "Valves & Controls",
			"slug": "valves-controls",
			"summary": "Valves, fittings, control systems, and related production-site components.",
			"count": "Network category"
		},
		{
			"name": "Instrumentation",
			"slug": "instrumentation",
			"summary": "Instrumentation, measurement equipment, and control components for field operations.",
			"count": "Network category"
		},
		{
			"name": "Wellhead Equipment",
			"slug": "wellhead-equipment",
			"summary": "Wellhead equipment, production-site hardware, and related field assets.",
			"count": "Network category"
		},
		{
			"name": "Other Equipment",
			"slug": "other-equipment",
			"summary": "Other oilfield, industrial, and surplus equipment that does not fit a primary category.",
			"count": "Network category"
		}
	],
	listings: [
		{
			"id": "PH-9902",
			"name": "3-Phase Production Separator",
			"category": "Separators",
			"location": "Wyoming Oilfields",
			"condition": "Field verified",
			"status": "Available",
			"manufacturer": "Production package",
			"year": "2020",
			"capacity": "36 in x 10 ft, 1440 WP",
			"description": "Production separator package positioned for operators sourcing verified used oilfield equipment across Wyoming and the Rockies.",
			"imagePosition": "22% center"
		},
		{
			"id": "PH-1148",
			"name": "Ariel JGK/4 Compressor Package",
			"category": "Compressors",
			"location": "Rockies and Bakken network",
			"condition": "Broker reviewed",
			"status": "Market movement",
			"manufacturer": "Ariel",
			"year": "2018",
			"capacity": "3550 HP, 2-stage",
			"description": "Compressor package tracked through Petra's buyer network for operators needing production compression without auction friction.",
			"imagePosition": "52% center"
		},
		{
			"id": "PH-7761",
			"name": "Storage Tank Battery Package",
			"category": "Tank Batteries",
			"location": "Colorado energy corridor",
			"condition": "Cleaned and inspected",
			"status": "Available",
			"manufacturer": "Fiberglass storage package",
			"year": "Recent surplus",
			"capacity": "400 BBL x 4",
			"description": "Tank battery package for buyers looking at field storage, production handling, and regional surplus equipment.",
			"imagePosition": "80% center"
		},
		{
			"id": "PH-5520",
			"name": "Transfer Pump Skid",
			"category": "Pump Packages",
			"location": "New Mexico and West Texas",
			"condition": "Sourcing verified",
			"status": "By request",
			"manufacturer": "Packaged pump skid",
			"year": "2019",
			"capacity": "High-volume transfer service",
			"description": "Pump package sourcing option for buyers who need specific flow requirements, site fit, and logistics support.",
			"imagePosition": "68% center"
		}
	],
	regions: [
		"Wyoming",
		"Powder River",
		"Rockies",
		"Bakken",
		"North Dakota",
		"Colorado",
		"Utah",
		"New Mexico",
		"Montana"
	]
};
//#endregion
//#region resources/js/Pages/Equipment.tsx
var Equipment_exports = /* @__PURE__ */ __exportAll({ default: () => Equipment });
var { heroImage: heroImage$10, categories: categories$2, listings, regions: regions$6 } = equipment_default;
var emptyFilters = {
	category: "",
	condition: "",
	location: "",
	manufacturer: "",
	availability: ""
};
var unique = (values) => Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
categories$2.slice(0, 4);
categories$2.slice(4);
var pageTitle$5 = "Used Oilfield Equipment Marketplace | Petra";
var pageDescription$5 = "Browse used oilfield and industrial equipment handled by Petra, including compressors, separators, tank batteries, and pump packages across Wyoming, the Rockies, and the Bakken.";
function Equipment({ canonicalUrl, ogImageUrl }) {
	const [filters, setFilters] = useState(emptyFilters);
	const hasActiveFilters = Object.values(filters).some(Boolean);
	const filterOptions = useMemo(() => ({
		category: categories$2.map((category) => category.name),
		condition: unique(listings.map((listing) => listing.condition)),
		location: unique(listings.map((listing) => listing.location)),
		manufacturer: unique(listings.map((listing) => listing.manufacturer)),
		availability: unique(listings.map((listing) => listing.status))
	}), []);
	const filterControls = [
		{
			key: "category",
			label: "Category",
			options: filterOptions.category
		},
		{
			key: "condition",
			label: "Condition",
			options: filterOptions.condition
		},
		{
			key: "location",
			label: "Location",
			options: filterOptions.location
		},
		{
			key: "manufacturer",
			label: "Manufacturer",
			options: filterOptions.manufacturer
		},
		{
			key: "availability",
			label: "Availability",
			options: filterOptions.availability
		}
	];
	const filteredListings = listings.filter((listing) => {
		return (!filters.category || listing.category === filters.category) && (!filters.condition || listing.condition === filters.condition) && (!filters.location || listing.location === filters.location) && (!filters.manufacturer || listing.manufacturer === filters.manufacturer) && (!filters.availability || listing.status === filters.availability);
	});
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "CollectionPage",
				"@id": `${canonicalUrl}#equipment-marketplace`,
				name: "Used Oilfield Equipment Marketplace",
				url: canonicalUrl,
				description: pageDescription$5,
				isPartOf: {
					"@type": "WebSite",
					name: "Petra",
					url: canonicalUrl.replace(/\/equipment$/, "")
				},
				about: categories$2.map((category) => category.name)
			},
			{
				"@type": "BreadcrumbList",
				"@id": `${canonicalUrl}#breadcrumbs`,
				itemListElement: [{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: canonicalUrl.replace(/\/equipment$/, "")
				}, {
					"@type": "ListItem",
					position: 2,
					name: "Equipment",
					item: canonicalUrl
				}]
			},
			{
				"@type": "ItemList",
				"@id": `${canonicalUrl}#featured-equipment`,
				name: "Featured used oilfield equipment",
				itemListElement: listings.map((listing, index) => ({
					"@type": "ListItem",
					position: index + 1,
					item: {
						"@type": "Product",
						name: listing.name,
						category: listing.category,
						description: listing.description,
						identifier: listing.id,
						brand: {
							"@type": "Brand",
							name: listing.manufacturer
						}
					}
				}))
			}
		]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: pageTitle$5,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: pageDescription$5
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "canonical",
				href: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "robots",
				content: "index, follow"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:title",
				content: pageTitle$5
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: pageDescription$5
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:type",
				content: "website"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:url",
				content: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image:alt",
				content: "Used oilfield and industrial equipment yard represented by Petra brokerage."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: pageTitle$5
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: pageDescription$5
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("script", {
				type: "application/ld+json",
				children: JSON.stringify(structuredData)
			})
		]
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [/* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:py-24",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-7 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ jsx("span", {
							className: "border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#a56437]",
							children: "Equipment Marketplace"
						}), /* @__PURE__ */ jsx("span", {
							className: "border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600",
							children: "Brokerage Verified"
						})]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.4rem] lg:text-[4.2rem]",
						children: "Used Oilfield Equipment"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg",
						children: "Browse representative listings, active categories, and broker-reviewed used oilfield equipment across Wyoming, the Rockies, the Bakken, and surrounding producing regions."
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 sm:flex-row lg:flex-col",
					children: [/* @__PURE__ */ jsx("a", {
						href: "#featured-equipment",
						className: "inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
						children: "View Equipment"
					}), /* @__PURE__ */ jsx("a", {
						href: "/request-equipment",
						className: "inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
						children: "Request Equipment"
					})]
				})]
			})
		}), /* @__PURE__ */ jsx("section", {
			id: "featured-equipment",
			className: "py-20 sm:py-24 lg:py-28",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[1280px] px-5 sm:px-10",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "max-w-3xl",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
									children: "Featured Equipment"
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
									children: "Representative Listings"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-5 text-lg leading-8 text-neutral-600",
									children: "These listings show the type of equipment Petra handles. Availability can move quickly, so use the inquiry CTA for current condition, location, and documentation."
								})
							]
						}), /* @__PURE__ */ jsx("a", {
							href: "/sell-equipment",
							className: "inline-flex h-16 w-fit items-center justify-center border border-neutral-500 px-8 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
							children: "Sell Equipment"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						"data-polish-reveal": true,
						className: "mb-12 border border-[#dad5cb] bg-white p-6 shadow-[0_18px_45px_rgba(28,26,22,0.06)] sm:p-8",
						children: [/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5",
							children: filterControls.map((filter) => /* @__PURE__ */ jsxs("label", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
									children: filter.label
								}), /* @__PURE__ */ jsxs("select", {
									value: filters[filter.key],
									onChange: (event) => setFilters((current) => ({
										...current,
										[filter.key]: event.target.value
									})),
									className: "h-12 border border-[#dad5cb] bg-[#f3f1ec] px-3 pr-9 font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950 outline-none transition-colors duration-200 hover:border-[#a56437]/60 focus:border-[#a56437]",
									children: [/* @__PURE__ */ jsxs("option", {
										value: "",
										children: ["All ", filter.label]
									}), filter.options.map((option) => /* @__PURE__ */ jsx("option", {
										value: option,
										children: option
									}, option))]
								})]
							}, filter.key))
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex flex-col gap-4 border-t border-[#dad5cb] pt-5 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ jsxs("p", {
								className: "font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600",
								children: [
									"Showing ",
									filteredListings.length,
									" of ",
									listings.length,
									" listings"
								]
							}), hasActiveFilters && /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setFilters(emptyFilters),
								className: "inline-flex h-11 w-fit items-center justify-center border border-neutral-500 px-6 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
								children: "Reset Filters"
							})]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "space-y-8",
						children: filteredListings.map((listing) => /* @__PURE__ */ jsxs("article", {
							"data-polish-reveal": true,
							className: "listing-transition group grid grid-cols-1 overflow-hidden border border-[#dad5cb] bg-white transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-[#a56437] hover:shadow-[0_24px_55px_rgba(28,26,22,0.12)] lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]",
							children: [/* @__PURE__ */ jsxs("figure", {
								className: "relative min-h-[260px] overflow-hidden bg-neutral-950 sm:min-h-[330px] lg:min-h-[390px]",
								children: [
									/* @__PURE__ */ jsx("img", {
										src: heroImage$10,
										alt: `${listing.name} represented in Petra's used oilfield equipment marketplace.`,
										loading: "lazy",
										className: "image-lift absolute inset-0 h-full w-full object-cover opacity-95",
										style: { objectPosition: listing.imagePosition }
									}),
									/* @__PURE__ */ jsx("div", {
										className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent",
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "absolute left-4 top-4 bg-[#a56437] px-3 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-white",
										children: listing.category
									}),
									/* @__PURE__ */ jsxs("figcaption", {
										className: "absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-4",
										children: [/* @__PURE__ */ jsx("span", {
											className: "max-w-xl font-heading text-2xl font-semibold uppercase leading-none tracking-[0.06em] text-white sm:text-3xl",
											children: listing.name
										}), /* @__PURE__ */ jsxs("span", {
											className: "border border-white/20 bg-black/50 px-2 py-1 font-heading text-xs font-semibold tracking-[0.08em] text-white/80 backdrop-blur-md",
											children: ["ID: ", listing.id]
										})]
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col p-6 sm:p-8",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "mb-5 flex flex-wrap items-center gap-3",
										children: [/* @__PURE__ */ jsx("span", {
											className: "bg-[#f3f1ec] px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.1em] text-[#a56437]",
											children: listing.status
										}), /* @__PURE__ */ jsx("span", {
											className: "font-heading text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500",
											children: listing.location
										})]
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "font-heading text-2xl font-semibold uppercase leading-tight tracking-[0.06em] text-neutral-950 sm:text-3xl",
										children: listing.name
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-4 text-base leading-7 text-neutral-600",
										children: listing.description
									}),
									/* @__PURE__ */ jsx("dl", {
										className: "my-6 grid grid-cols-1 gap-px bg-[#dad5cb] sm:grid-cols-2",
										children: [
											["Condition", listing.condition],
											["Manufacturer", listing.manufacturer],
											["Year", listing.year],
											["Capacity", listing.capacity],
											["Status", listing.status],
											["Region", listing.location]
										].map(([label, value]) => /* @__PURE__ */ jsxs("div", {
											className: "bg-white p-4",
											children: [/* @__PURE__ */ jsx("dt", {
												className: "font-heading text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500",
												children: label
											}), /* @__PURE__ */ jsx("dd", {
												className: "mt-1 font-heading text-sm font-semibold text-neutral-950",
												children: value
											})]
										}, label))
									}),
									/* @__PURE__ */ jsx("a", {
										href: `/request-equipment?asset=${listing.id}`,
										className: "mt-auto flex h-14 items-center justify-center bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
										children: "Request Details"
									})
								]
							})]
						}, listing.id))
					}),
					filteredListings.length === 0 && /* @__PURE__ */ jsx("div", {
						className: "border border-[#dad5cb] bg-white p-8 text-center",
						children: /* @__PURE__ */ jsx("p", {
							className: "text-lg leading-8 text-neutral-600",
							children: "No listed equipment matches those filters right now."
						})
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mx-auto mt-12 max-w-3xl text-center text-lg leading-8 text-neutral-600",
						children: "If you see equipment that matches your needs, reach out early. High-quality assets move fast."
					})
				]
			})
		})]
	})] });
}
//#endregion
//#region resources/js/Components/polish.tsx
function classes(...values) {
	return values.filter(Boolean).join(" ");
}
function AnimatedPage({ busy = false, children, className, ...props }) {
	const pageRef = useRef(null);
	useEffect(() => {
		const page = pageRef.current;
		if (!page || !("IntersectionObserver" in window)) return;
		const targets = Array.from(page.querySelectorAll([
			"main > section:first-child h1",
			"main > section:first-child p",
			"main > section:first-child a",
			"main > section:first-child button",
			"main > section:first-child span",
			"main > section:not(:first-child) h2",
			"main > section:not(:first-child) h3",
			"main > section:not(:first-child) article",
			"main > section:not(:first-child) figure",
			"main > section:not(:first-child) li",
			"[data-polish-reveal]"
		].join(", ")));
		targets.forEach((target, index) => {
			target.classList.add("polish-reveal");
			target.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 45}ms`);
		});
		page.querySelectorAll("main a, main button").forEach((target) => {
			target.classList.add("button-press", "focus-copper");
		});
		page.querySelectorAll("main select").forEach((target) => {
			target.classList.add("polished-select", "focus-copper");
		});
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		}, {
			rootMargin: "0px 0px -10% 0px",
			threshold: .12
		});
		targets.forEach((target) => observer.observe(target));
		return () => observer.disconnect();
	}, [children]);
	return /* @__PURE__ */ jsx("div", {
		ref: pageRef,
		className: classes("animated-page transition-opacity duration-200", busy && "page-is-busy", className),
		"aria-busy": busy,
		...props,
		children
	});
}
function CtaLink({ variant = "primary", className, children, ...props }) {
	return /* @__PURE__ */ jsx("a", {
		className: classes("button-press focus-copper inline-flex h-14 items-center justify-center px-8 font-heading text-base font-semibold uppercase tracking-[0.1em]", {
			primary: "bg-[#a56437] text-white hover:bg-[#874d29]",
			outline: "border border-neutral-500 text-neutral-950 hover:bg-neutral-950 hover:text-white",
			dark: "border border-white/50 text-white hover:bg-white/10"
		}[variant], className),
		...props,
		children
	});
}
//#endregion
//#region resources/js/Pages/Errors/NotFound.tsx
var NotFound_exports = /* @__PURE__ */ __exportAll({ default: () => NotFound });
function NotFound() {
	return /* @__PURE__ */ jsx("main", {
		className: "flex min-h-[calc(100vh-4.5rem)] w-full items-center px-5 py-16 sm:px-10",
		children: /* @__PURE__ */ jsxs("section", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "font-heading text-base font-semibold uppercase tracking-[0.18em] text-[#9d5f35]",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-4 font-heading text-5xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-6xl",
					children: "Page Not Found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-5 max-w-xl text-base leading-7 text-neutral-600",
					children: "This route does not exist or has moved. Head back to the homepage to continue browsing Petra."
				}),
				/* @__PURE__ */ jsx(CtaLink, {
					href: "/",
					className: "mt-8 h-11 bg-[#9d5f35] px-6 hover:bg-[#874d29]",
					children: "Back to Homepage"
				})
			]
		})
	});
}
//#endregion
//#region resources/js/Components/coverage-map.tsx
function CoverageMap() {
	return /* @__PURE__ */ jsx("iframe", {
		title: "Google map showing Petra Industrial regional coverage",
		src: "https://maps.google.com/maps?ll=42.5,-108.5&z=5&t=m&output=embed",
		className: "absolute inset-0 h-full w-full grayscale",
		loading: "lazy",
		referrerPolicy: "no-referrer-when-downgrade"
	});
}
//#endregion
//#region resources/js/Components/home-icons.tsx
function FeatureIcon({ type, className = "h-5 w-5" }) {
	if (type === "badge") return /* @__PURE__ */ jsxs("svg", {
		className: `${className} text-[#a56437]`,
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("path", {
			d: "M12 3.5 14.2 6l3.3-.3.6 3.2 2.7 1.8-1.6 2.9.8 3.2-3.2.9-1.8 2.8-3-1.5-3 1.5-1.8-2.8-3.2-.9.8-3.2-1.6-2.9 2.7-1.8.6-3.2 3.3.3L12 3.5Z",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ jsx("path", {
			d: "m8.8 12.2 2 2 4.4-4.6",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
	if (type === "truck") return /* @__PURE__ */ jsxs("svg", {
		className: `${className} text-[#a56437]`,
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M4 7h10v9H4V7Z",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M14 10h3.4l2.6 3.1V16h-6v-6Z",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
				stroke: "currentColor",
				strokeWidth: "1.8"
			})
		]
	});
	return /* @__PURE__ */ jsxs("svg", {
		className: `${className} text-[#a56437]`,
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("circle", {
			cx: "12",
			cy: "12",
			r: "8.2",
			stroke: "currentColor",
			strokeWidth: "1.8"
		}), /* @__PURE__ */ jsx("path", {
			d: "m8.7 12.1 2.1 2.1 4.6-4.8",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}
function CategoryIcon({ type }) {
	if (type === "loader") return /* @__PURE__ */ jsxs("svg", {
		className: "h-7 w-7 text-[#b06b3d]",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M3.5 15.5h7.4l2.4-5.4h3.4l2.8 5.4h1",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M6.3 18.5a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2ZM16.3 18.5a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z",
				stroke: "currentColor",
				strokeWidth: "1.8"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M13.5 10.1 10.8 7.4H8.2",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	});
	if (type === "dozer") return /* @__PURE__ */ jsxs("svg", {
		className: "h-7 w-7 text-[#b06b3d]",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M4 16h9.2l2.2-4.5h2.9l1.7 4.5",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M3.5 17.5h16.8",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M7.5 14.5V9.8h4.7l2.1 1.7",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M5.8 19.2h12.7",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round"
			})
		]
	});
	if (type === "compaction") return /* @__PURE__ */ jsxs("svg", {
		className: "h-7 w-7 text-[#b06b3d]",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M5 15.6h13.3l2.2-2.8v4.6H5v-1.8Z",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M8 15.6V8.5h5.7l2.1 2.5v4.6",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M7.3 19.2h11.4",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round"
			})
		]
	});
	return /* @__PURE__ */ jsxs("svg", {
		className: "h-7 w-7 text-[#b06b3d]",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("path", {
			d: "m14.4 4.5 5.1 5.1-2.7 2.7-1.5-1.5-6.8 6.8-2.1-2.1 6.8-6.8-1.5-1.5 2.7-2.7Z",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ jsx("path", {
			d: "m4.5 19.5 4.1-4.1",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinecap: "round"
		})]
	});
}
function AccentIcon$1({ type }) {
	return /* @__PURE__ */ jsx("svg", {
		className: "h-12 w-12 text-[#a56437]",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("path", {
			d: {
				sell: "M5 6h7.5l6.5 6.5-6.5 6.5L5 11.5V6Zm4 4h.01",
				search: "m20 20-4.2-4.2M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"
			}[type],
			stroke: "currentColor",
			strokeWidth: "1.7",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
var home_default = {
	heroImage: "/images/petra-equipment-yard-hero.png",
	stats: [
		{
			"value": "Field",
			"label": "Reality"
		},
		{
			"value": "Real",
			"label": "Buyers"
		},
		{
			"value": "Deals",
			"label": "Moving"
		},
		{
			"value": "Regional",
			"label": "Markets"
		}
	],
	featureItems: [
		{
			"label": "Straight Brokerage",
			"icon": "check"
		},
		{
			"label": "Real Buyers",
			"icon": "badge"
		},
		{
			"label": "Field Equipment",
			"icon": "truck"
		}
	],
	categories: [
		{
			"label": "Compressors",
			"icon": "tool",
			"imagePosition": "18% center"
		},
		{
			"label": "Separators",
			"icon": "loader",
			"imagePosition": "40% center"
		},
		{
			"label": "Tank Batteries",
			"icon": "dozer",
			"imagePosition": "64% center"
		},
		{
			"label": "Pump Packages",
			"icon": "compaction",
			"imagePosition": "86% center"
		}
	],
	additionalCategories: [
		"Production equipment packages",
		"Heater treaters",
		"Pumping units",
		"Generators & power units",
		"Gas processing equipment",
		"Flowback & well testing equipment",
		"Pipe, tubing, and surplus yard inventory",
		"Valves, fittings, and control systems"
	],
	processSteps: [
		{
			"number": "01",
			"title": "Tell Us",
			"description": "You tell us what you've got or what you need. No complicated forms, just the basics."
		},
		{
			"number": "02",
			"title": "Review",
			"description": "We review it, position it correctly, and identify where it fits in the market."
		},
		{
			"number": "03",
			"title": "Connect",
			"description": "We connect the right buyers and sellers, not everyone, just the ones who matter."
		},
		{
			"number": "04",
			"title": "Negotiation",
			"description": "We handle the back-and-forth around pricing, questions, negotiation, and documentation."
		},
		{
			"number": "05",
			"title": "Deal Done",
			"description": "Equipment moves, paperwork clears, and everyone moves on."
		}
	],
	inventoryItems: [
		{
			"title": "3-Phase Separator",
			"badge": "Available",
			"badgeStyle": "solid",
			"id": "PH-9902",
			"imagePosition": "22% center",
			"specs": [
				["Year", "2020"],
				["PSI", "1440 WP"],
				["Size", "36\" x 10'"],
				["Condition", "Certified"]
			]
		},
		{
			"title": "Ariel JGK/4 Compressor",
			"badge": "Market Movement",
			"badgeStyle": "primary",
			"id": "PH-1148",
			"imagePosition": "52% center",
			"specs": [
				["Year", "2018"],
				["HP", "3550"],
				["Hours", "4200"],
				["Stages", "2-Stage"]
			]
		},
		{
			"title": "Storage Tank Battery",
			"badge": "Available",
			"badgeStyle": "outline",
			"id": "PH-7761",
			"imagePosition": "80% center",
			"specs": [
				["Capacity", "400 BBL x 4"],
				["Material", "Fiberglass"],
				["Status", "Cleaned"],
				["Coating", "Internal"]
			]
		}
	],
	whyPeopleWorkWithPetra: [
		{
			"title": "We understand field reality",
			"description": "We're not guessing what a compressor package is or how it's used. We know how it actually runs in the field."
		},
		{
			"title": "We deal with real buyers",
			"description": "Not tire-kickers. Not \"just curious\" inquiries."
		},
		{
			"title": "We keep deals moving",
			"description": "No ghosting. No endless waiting for replies."
		},
		{
			"title": "We know regional markets",
			"description": "Wyoming, Powder River, Bakken, Rockies—we understand how pricing and demand actually shift here."
		}
	],
	states: [
		"Wyoming oilfields (Powder River, Jonah, Green River Basin)",
		"North Dakota (Bakken)",
		"Colorado energy corridors",
		"Utah & New Mexico producing regions",
		"Montana industrial yards",
		"Regional surplus equipment yards and private sellers"
	]
};
//#endregion
//#region resources/js/Pages/Home.tsx
var Home_exports = /* @__PURE__ */ __exportAll({ default: () => Home });
var { heroImage: heroImage$8, stats, featureItems, categories, additionalCategories, processSteps: processSteps$4, inventoryItems, whyPeopleWorkWithPetra, states } = home_default;
var pageTitle$4 = "Petra | Used Oilfield & Industrial Equipment Brokerage";
var pageDescription$4 = "Petra connects real buyers and sellers of used oilfield and industrial equipment across Wyoming, the Rockies, the Bakken, and surrounding producing regions.";
function Home({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "Organization",
			"@id": `${canonicalUrl}#organization`,
			name: "Petra",
			url: canonicalUrl,
			description: "Used oilfield and industrial equipment brokerage serving Wyoming, the Rockies, and surrounding producing regions.",
			areaServed: [
				"Wyoming",
				"Rockies",
				"Bakken",
				"North Dakota",
				"Colorado",
				"Utah",
				"New Mexico",
				"Montana"
			],
			knowsAbout: [
				"Used oilfield equipment",
				"Industrial equipment brokerage",
				"Equipment sourcing",
				"Asset liquidation",
				"Equipment valuation"
			]
		}, {
			"@type": "WebSite",
			"@id": `${canonicalUrl}#website`,
			name: "Petra",
			url: canonicalUrl,
			publisher: { "@id": `${canonicalUrl}#organization` },
			description: pageDescription$4
		}]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: pageTitle$4,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: pageDescription$4
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "canonical",
				href: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "robots",
				content: "index, follow"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:title",
				content: pageTitle$4
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: pageDescription$4
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:type",
				content: "website"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:url",
				content: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image:alt",
				content: "Used oilfield and industrial equipment yard represented by Petra brokerage."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: pageTitle$4
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: pageDescription$4
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("script", {
				type: "application/ld+json",
				children: JSON.stringify(structuredData)
			})
		]
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "hero-parallax relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-950 px-5 py-20 text-center text-white sm:px-10",
				style: {
					backgroundImage: `url('${heroImage$8}')`,
					backgroundSize: "cover"
				},
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "absolute inset-0 grayscale",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "absolute inset-0 bg-black/65",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative z-10 flex w-full max-w-4xl flex-col items-center",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-8 flex flex-wrap justify-center gap-4",
								children: [/* @__PURE__ */ jsx("span", {
									className: "border border-white/30 px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-white/80",
									children: "Used Oilfield Equipment"
								}), /* @__PURE__ */ jsx("span", {
									className: "border border-white/30 px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-white/80",
									children: "Industrial Brokerage"
								})]
							}),
							/* @__PURE__ */ jsxs("h1", {
								className: "font-hero text-[2.65rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-white sm:text-[3.25rem] lg:text-[4rem]",
								children: [/* @__PURE__ */ jsx("span", {
									className: "block sm:whitespace-nowrap",
									children: "Got Equipment Sitting Idle"
								}), /* @__PURE__ */ jsx("span", {
									className: "block text-[#b06b3d]",
									children: "Out in the Field?"
								})]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-8 max-w-2xl text-base font-medium leading-7 text-white/80 sm:text-lg",
								children: "Or trying to find a solid piece of gear without chasing 12 different sellers who don't return calls?"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-5 max-w-2xl text-base font-medium leading-7 text-white/80 sm:text-lg",
								children: "Petra helps you move equipment faster without the runaround. We connect real buyers and sellers of used oilfield and industrial equipment across Wyoming, the Rockies, and surrounding producing regions."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-12 flex w-full max-w-xs flex-col gap-4",
								children: [/* @__PURE__ */ jsx("a", {
									href: "/equipment",
									className: "flex h-16 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
									children: "See Available Equipment"
								}), /* @__PURE__ */ jsx("a", {
									href: "/sell-equipment",
									className: "flex h-16 items-center justify-center border border-white/50 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white/10",
									children: "Sell Your Equipment"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "border-b border-[#dad5cb] bg-white",
				children: [/* @__PURE__ */ jsx("div", {
					className: "mx-auto grid max-w-[1280px] grid-cols-2 gap-10 px-5 py-20 text-center sm:px-10 md:grid-cols-4 lg:py-24",
					children: stats.map((stat) => /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-[2.6rem] font-normal uppercase leading-none tracking-[0.03em] text-[#a56437] lg:text-[2.85rem]",
							children: stat.value
						}), /* @__PURE__ */ jsx("span", {
							className: "mt-3 font-heading text-xl font-normal uppercase tracking-[0.08em] text-neutral-700",
							children: stat.label
						})]
					}, stat.label))
				}), /* @__PURE__ */ jsx("div", {
					className: "border-t border-[#dad5cb] bg-white py-8",
					children: /* @__PURE__ */ jsxs("div", {
						className: "mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 px-5 sm:px-10 lg:flex-row lg:items-center",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "max-w-xl",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-heading text-base font-semibold tracking-[0.08em] text-neutral-600 lg:whitespace-nowrap",
								children: "No auctions. No guessing games. No wasted time."
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-3 text-base leading-7 text-neutral-600",
								children: "Just straight brokerage work between people who actually understand field equipment."
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "flex flex-col gap-5 sm:flex-row sm:flex-wrap lg:flex-nowrap lg:gap-10",
							children: featureItems.map((item) => /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx(FeatureIcon, {
									type: item.icon,
									className: "h-5 w-5 shrink-0"
								}), /* @__PURE__ */ jsx("span", {
									className: "font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 lg:whitespace-nowrap",
									children: item.label
								})]
							}, item.label))
						})]
					})
				})]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "bg-[#1c1a16] py-28 text-white sm:py-36 lg:py-40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-5 sm:px-10 lg:grid-cols-12 lg:items-start",
					children: [/* @__PURE__ */ jsx("div", {
						className: "lg:col-span-5",
						children: /* @__PURE__ */ jsx("h2", {
							className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-white sm:text-5xl",
							children: "Equipment doesn't move itself. And it doesn't sell itself either."
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-7",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-lg leading-8 text-white/75",
								children: "If you've ever tried to sell a separator, compressor, tank battery, or pump package—you already know:"
							}),
							/* @__PURE__ */ jsx("ul", {
								className: "mt-10 space-y-6 border-y border-white/15 py-10",
								children: [
									"Posting online doesn't bring serious buyers",
									"Most \"buyers\" aren't actually ready",
									"And half the time, you're stuck explaining specs over and over again"
								].map((item) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ jsx(FeatureIcon, {
										type: "check",
										className: "mt-0.5 h-5 w-5"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-lg leading-7 text-white/85",
										children: item
									})]
								}, item))
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-10 text-lg leading-8 text-white/75",
								children: "Petra steps in as the middle ground. We take the equipment, get it properly represented, and put it in front of the right people who are actually in the market."
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "bg-[#f3f1ec] py-28 sm:py-36 lg:py-40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 sm:px-10",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mb-16 text-center sm:mb-24",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
									children: "Equipment Types"
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
									children: "What We Actually Deal With"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600",
									children: "If it runs in the field, processes product, or moves production, we probably handle it."
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-6 flex justify-center",
									children: /* @__PURE__ */ jsx("a", {
										className: "border-b border-[#a56437] pb-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#a56437] transition-colors hover:border-neutral-950 hover:text-neutral-950",
										href: "/equipment",
										children: "Browse Equipment"
									})
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 gap-4 md:grid-cols-4",
							children: categories.map((category) => /* @__PURE__ */ jsxs("a", {
								href: "/equipment",
								className: "group relative h-[500px] cursor-pointer overflow-hidden bg-neutral-950",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "absolute inset-0 bg-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0",
										style: {
											backgroundImage: `url('${heroImage$8}')`,
											backgroundPosition: category.imagePosition
										},
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "absolute inset-0 bg-black/45 transition-colors group-hover:bg-black/25",
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent",
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "absolute inset-0 flex flex-col items-center justify-end p-10",
										children: [/* @__PURE__ */ jsx("div", {
											className: "translate-y-4 transition-transform group-hover:translate-y-0",
											children: /* @__PURE__ */ jsx(CategoryIcon, { type: category.icon })
										}), /* @__PURE__ */ jsx("h4", {
											className: "mt-4 font-heading text-xl font-semibold uppercase tracking-[0.08em] text-white",
											children: category.label
										})]
									})
								]
							}, category.label))
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-12 border border-[#dad5cb] bg-white p-8 sm:p-10",
							children: /* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4",
								children: additionalCategories.map((category) => /* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ jsx(FeatureIcon, {
										type: "check",
										className: "mt-0.5 h-5 w-5"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-base leading-7 text-neutral-700",
										children: category
									})]
								}, category))
							})
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mx-auto mt-10 max-w-2xl text-center text-lg leading-8 text-neutral-600",
							children: "If it's sitting in a yard collecting dust—we can probably move it."
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-y border-[#dad5cb] bg-white py-28 sm:py-36 lg:py-40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 sm:px-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-20 text-center sm:mb-28",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
							children: "Simple Version"
						}), /* @__PURE__ */ jsx("h2", {
							className: "mt-4 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
							children: "How Petra Works"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("div", {
							className: "absolute left-0 top-8 hidden h-px w-full bg-[#dad5cb] md:block",
							"aria-hidden": "true"
						}), /* @__PURE__ */ jsx("div", {
							className: "relative z-10 grid grid-cols-1 gap-12 text-center md:grid-cols-5",
							children: processSteps$4.map((step, index) => /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-center gap-8",
								children: [/* @__PURE__ */ jsx("div", {
									className: `flex h-16 w-16 items-center justify-center font-heading text-2xl font-semibold ${index === 0 ? "bg-[#a56437] text-white" : "border border-[#dad5cb] bg-white text-neutral-950"}`,
									children: step.number
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "mb-3 font-heading text-xl font-semibold uppercase tracking-[0.06em] text-neutral-950",
									children: step.title
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm leading-6 text-neutral-600",
									children: step.description
								})] })]
							}, step.number))
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "bg-[#f3f1ec] py-28 sm:py-36 lg:py-40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 sm:px-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-16 flex flex-col items-center justify-between gap-6 text-center md:mb-24 md:flex-row md:items-end md:text-left",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("span", {
								className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Featured Equipment"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
								children: "Real Equipment. Real Listings."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 text-lg text-neutral-600",
								children: "Browse what is currently available or contact us if you're looking for something specific."
							})
						] }), /* @__PURE__ */ jsx("a", {
							href: "/equipment",
							className: "border border-neutral-500 px-8 py-4 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
							children: "View Equipment"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12",
						children: inventoryItems.map((item) => /* @__PURE__ */ jsxs("article", {
							className: "group border border-[#dad5cb] bg-white transition-colors duration-500 hover:border-[#a56437]",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative h-72 overflow-hidden bg-black",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "absolute inset-0 bg-cover grayscale opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0",
										style: {
											backgroundImage: `url('${heroImage$8}')`,
											backgroundPosition: item.imagePosition
										},
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ jsx("div", {
										className: `absolute left-0 top-0 px-4 py-2 font-heading text-sm font-semibold uppercase tracking-[0.08em] ${item.badgeStyle === "outline" ? "border border-[#a56437] bg-white/90 text-[#a56437]" : item.badgeStyle === "primary" ? "bg-[#a56437] text-white" : "bg-neutral-500 text-white"}`,
										children: item.badge
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "absolute bottom-4 right-4 border border-white/20 bg-black/50 px-2 py-1 font-heading text-sm font-semibold tracking-[0.08em] text-white/80 backdrop-blur-md",
										children: ["ID: ", item.id]
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-8",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "mb-6 border-b border-[#dad5cb] pb-4 font-heading text-2xl font-semibold uppercase tracking-[0.06em] text-neutral-950",
										children: item.title
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mb-8 grid grid-cols-2 gap-y-6",
										children: item.specs.map(([label, value], index) => /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-heading text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500",
												children: label
											}), /* @__PURE__ */ jsx("span", {
												className: `font-heading text-base font-semibold ${index === 3 ? "text-[#a56437]" : "text-neutral-950"}`,
												children: value
											})]
										}, label))
									}),
									/* @__PURE__ */ jsx("a", {
										href: "/contact",
										className: "flex w-full items-center justify-center border border-[#dad5cb] bg-[#f3f1ec] py-4 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
										children: "Request Details"
									})
								]
							})]
						}, item.id))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-y border-[#dad5cb] bg-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-[1280px] grid-cols-1 px-5 sm:px-10 md:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col border-b border-[#dad5cb] py-28 md:border-b-0 md:border-r md:py-40 md:pr-20",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-10 flex items-center gap-4",
								children: [/* @__PURE__ */ jsx(AccentIcon$1, { type: "sell" }), /* @__PURE__ */ jsx("div", { className: "h-px flex-grow bg-[#dad5cb]" })]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Selling Equipment"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mb-8 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950",
								children: "Sell Your Equipment"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mb-10 text-lg leading-8 text-neutral-600",
								children: "Most companies do not lose money because the equipment is bad. They lose money because it sits too long, nobody markets it properly, or it is only shown to a small local network."
							}),
							/* @__PURE__ */ jsxs("ul", {
								className: "mb-12 space-y-6",
								children: [
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx(FeatureIcon, {
											type: "check",
											className: "mt-0.5 h-5 w-5"
										}), /* @__PURE__ */ jsx("span", { children: "Get equipment in front of active buyers." })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx(FeatureIcon, {
											type: "check",
											className: "mt-0.5 h-5 w-5"
										}), /* @__PURE__ */ jsx("span", { children: "Price it based on actual market movement, not guesswork." })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx(FeatureIcon, {
											type: "check",
											className: "mt-0.5 h-5 w-5"
										}), /* @__PURE__ */ jsx("span", { children: "Handle buyer calls and negotiation." })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx(FeatureIcon, {
											type: "check",
											className: "mt-0.5 h-5 w-5"
										}), /* @__PURE__ */ jsx("span", { children: "Move equipment without tying up your team." })]
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mb-12 text-lg leading-8 text-neutral-600",
								children: "If you've got surplus iron sitting in a yard in Wyoming, North Dakota, or Colorado—we'll help you turn it into capital again."
							}),
							/* @__PURE__ */ jsx("a", {
								href: "/sell-equipment",
								className: "mt-auto inline-flex h-16 w-fit items-center self-start bg-[#a56437] px-12 font-heading text-base font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90",
								children: "Sell Equipment"
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col py-28 md:py-40 md:pl-20",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-10 flex items-center gap-4",
								children: [/* @__PURE__ */ jsx("div", { className: "h-px flex-grow bg-[#dad5cb]" }), /* @__PURE__ */ jsx(AccentIcon$1, { type: "search" })]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Looking for Equipment"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mb-8 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950",
								children: "Request Equipment"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mb-10 text-lg leading-8 text-neutral-600",
								children: "Most buyers do not need more listings. They need:"
							}),
							/* @__PURE__ */ jsxs("ul", {
								className: "mb-12 space-y-6",
								children: [
									[
										"The right size",
										"The right spec",
										"The right condition",
										"And someone who actually knows where to find it"
									].map((item) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx(FeatureIcon, {
											type: "check",
											className: "mt-0.5 h-5 w-5"
										}), /* @__PURE__ */ jsx("span", { children: item })]
									}, item)),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx(FeatureIcon, {
											type: "check",
											className: "mt-0.5 h-5 w-5"
										}), /* @__PURE__ */ jsx("span", { children: "Tell us what you're trying to source." })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx(FeatureIcon, {
											type: "check",
											className: "mt-0.5 h-5 w-5"
										}), /* @__PURE__ */ jsx("span", { children: "We work our network and come back with real options." })]
									})
								]
							}),
							/* @__PURE__ */ jsx("a", {
								href: "/contact",
								className: "mt-auto inline-flex h-16 w-fit items-center self-start border border-neutral-950 px-12 font-heading text-base font-semibold uppercase tracking-[0.12em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
								children: "Request Equipment"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "bg-[#f3f1ec] py-28 sm:py-36 lg:py-40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 sm:px-10",
					children: [/* @__PURE__ */ jsx("div", {
						className: "mb-16 text-center sm:mb-24",
						children: /* @__PURE__ */ jsx("h2", {
							className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
							children: "Why People Work With Petra"
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 gap-6 md:grid-cols-2",
						children: whyPeopleWorkWithPetra.map((item) => /* @__PURE__ */ jsxs("article", {
							className: "border border-[#dad5cb] bg-white p-8 sm:p-10",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-heading text-2xl font-semibold uppercase tracking-[0.06em] text-neutral-950",
								children: item.title
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-5 text-base leading-7 text-neutral-600",
								children: item.description
							})]
						}, item.title))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "bg-[#f3f1ec] py-28 sm:py-36 lg:py-40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-5 sm:px-10 md:grid-cols-12",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "md:col-span-5",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-heading text-sm font-semibold uppercase tracking-[0.3em] text-[#a56437]",
								children: "Service Area"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mb-8 mt-6 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
								children: "Where We Operate"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mb-12 text-lg leading-8 text-neutral-600",
								children: "We work across producing and industrial regions including Wyoming, the Bakken, Colorado energy corridors, Utah, New Mexico, Montana, and regional surplus equipment yards."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex flex-col gap-6",
								children: states.map((state) => /* @__PURE__ */ jsxs("div", {
									className: "group flex items-center gap-4 border-b border-[#dad5cb] pb-4",
									children: [/* @__PURE__ */ jsx("div", { className: "h-1.5 w-1.5 bg-[#a56437]" }), /* @__PURE__ */ jsx("span", {
										className: "font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors group-hover:text-[#a56437]",
										children: state
									})]
								}, state))
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-10 text-lg leading-8 text-neutral-600",
								children: "If equipment is moving in these areas—we're usually already connected to it."
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative h-[520px] overflow-hidden border border-[#dad5cb] bg-white md:col-span-7 lg:h-[650px]",
						children: [
							/* @__PURE__ */ jsx(CoverageMap, {}),
							/* @__PURE__ */ jsx("div", {
								className: "pointer-events-none absolute inset-0 bg-white/20",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "pointer-events-none absolute inset-6 border border-[#dad5cb]",
								"aria-hidden": "true"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-t border-[#dad5cb] bg-white py-28 text-center sm:py-36 lg:py-40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[900px] px-5 sm:px-10",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
							children: "Not Sure What Your Equipment Is Worth?"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mx-auto mt-8 max-w-3xl text-lg leading-8 text-neutral-600",
							children: "Most people either overprice it and it sits for months, or underprice it and leave money on the table. We help you find the middle ground based on actual market activity—not guesswork or outdated pricing charts."
						}),
						/* @__PURE__ */ jsx("a", {
							href: "/contact",
							className: "mt-12 inline-flex h-16 items-center justify-center bg-[#a56437] px-12 font-heading text-base font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90",
							children: "Request Valuation"
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-t border-[#dad5cb] bg-[#1c1a16] py-32 text-center text-white sm:py-40 lg:py-48",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 sm:px-10",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "mb-6 block font-heading text-sm font-semibold uppercase tracking-[0.3em] text-[#a56437]",
							children: "Let's Connect"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mb-10 font-heading text-4xl font-bold uppercase tracking-[0.12em] text-white sm:text-6xl",
							children: "Let's Move Something"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mx-auto mb-16 max-w-2xl text-lg leading-8 text-white/80",
							children: "If you've got equipment to sell or you're trying to source something for a job, just reach out. We'll tell you straight up if we can help or not."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col justify-center gap-6 md:flex-row md:gap-8",
							children: [/* @__PURE__ */ jsx("a", {
								href: "/contact",
								className: "inline-flex h-16 items-center justify-center bg-[#a56437] px-12 font-heading text-base font-semibold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90 sm:px-16",
								children: "Talk to a Broker"
							}), /* @__PURE__ */ jsx("a", {
								href: "/equipment",
								className: "inline-flex h-16 items-center justify-center border border-white/50 px-12 font-heading text-base font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10 sm:px-16",
								children: "Browse Equipment"
							})]
						})
					]
				})
			})
		]
	})] });
}
var industries_default = {
	heroImage: "/images/petra-equipment-yard-hero.png",
	industries: [
		{
			"title": "Oil and Gas Production",
			"summary": "Production equipment, compression, separation, tank batteries, pump packages, and field assets used across producing basins.",
			"equipment": [
				"Separators",
				"Compressors",
				"Tank batteries",
				"Pump packages"
			]
		},
		{
			"title": "Midstream Operations",
			"summary": "Equipment tied to movement, pressure, processing support, and site infrastructure for oil and gas systems.",
			"equipment": [
				"Compression packages",
				"Piping assets",
				"Support skids",
				"Production handling"
			]
		},
		{
			"title": "Industrial Surplus",
			"summary": "Used industrial equipment and surplus assets that still have practical value for operators, yards, and regional buyers.",
			"equipment": [
				"Surplus packages",
				"Storage assets",
				"Field support",
				"Process equipment"
			]
		},
		{
			"title": "Regional Equipment Yards",
			"summary": "Assets sitting in yards, operator facilities, and surplus channels across Wyoming, the Rockies, and surrounding regions.",
			"equipment": [
				"Idle equipment",
				"Stored assets",
				"Decommissioned units",
				"Ready-to-move packages"
			]
		}
	],
	signals: [
		{
			"title": "Field Use",
			"description": "Petra evaluates what the equipment was built to do, where it has been used, and whether that use case still matches buyer demand."
		},
		{
			"title": "Regional Demand",
			"description": "Equipment fit changes by basin, timing, logistics, and operator needs. Petra keeps regional movement part of the conversation."
		},
		{
			"title": "Asset Readiness",
			"description": "Condition, documentation, access, and transportation all affect whether an equipment opportunity is actually workable."
		}
	],
	regions: [
		"Wyoming",
		"Powder River",
		"Rockies",
		"Bakken",
		"North Dakota",
		"Colorado",
		"Utah",
		"New Mexico",
		"Montana"
	],
	faqs: [
		{
			"question": "Which industries does Petra serve?",
			"answer": "Petra focuses on used oilfield and industrial equipment for oil and gas production, midstream operations, industrial surplus, and regional equipment yards."
		},
		{
			"question": "Does Petra work outside one basin?",
			"answer": "Yes. Petra works across Wyoming, the Powder River, the Rockies, the Bakken, North Dakota, Colorado, Utah, New Mexico, Montana, and surrounding producing regions."
		},
		{
			"question": "Why does industry context matter?",
			"answer": "The same piece of equipment can have different value depending on field use, location, condition, buyer demand, documents, and logistics."
		}
	]
};
//#endregion
//#region resources/js/Pages/Industries.tsx
var Industries_exports = /* @__PURE__ */ __exportAll({ default: () => Industries });
var { heroImage: heroImage$6, industries, signals, regions: regions$4, faqs: faqs$6 } = industries_default;
var pageTitle$3 = "Industries | Petra";
var pageDescription$3 = "Petra works across producing and industrial regions including Wyoming, the Bakken, Colorado energy corridors, Utah, New Mexico, Montana, and regional surplus equipment yards.";
function Industries({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "CollectionPage",
			"@id": `${canonicalUrl}#industries`,
			name: "Industries",
			url: canonicalUrl,
			description: pageDescription$3,
			about: [
				"Wyoming oilfields",
				"North Dakota Bakken",
				"Colorado energy corridors",
				"Utah and New Mexico producing regions",
				"Montana industrial yards",
				"Regional surplus equipment yards and private sellers"
			],
			isPartOf: {
				"@type": "WebSite",
				name: "Petra",
				url: canonicalUrl.replace(/\/industries$/, "")
			}
		}, {
			"@type": "BreadcrumbList",
			"@id": `${canonicalUrl}#breadcrumbs`,
			itemListElement: [{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: canonicalUrl.replace(/\/industries$/, "")
			}, {
				"@type": "ListItem",
				position: 2,
				name: "Industries",
				item: canonicalUrl
			}]
		}]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: pageTitle$3,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: pageDescription$3
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "canonical",
				href: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "robots",
				content: "index, follow"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:title",
				content: pageTitle$3
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: pageDescription$3
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:type",
				content: "website"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:url",
				content: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image:alt",
				content: "Oilfield and industrial equipment yard represented by Petra."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: pageTitle$3
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: pageDescription$3
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("script", {
				type: "application/ld+json",
				children: JSON.stringify(structuredData)
			})
		]
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [/* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-24",
				children: /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("h1", {
						className: "max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]",
						children: "Industries"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg",
						children: "We work across producing and industrial regions including Wyoming, the Bakken, Colorado energy corridors, Utah, New Mexico, Montana, and regional surplus equipment yards."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-10 flex flex-col gap-4 sm:flex-row",
						children: [/* @__PURE__ */ jsx("a", {
							href: "/equipment",
							className: "inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
							children: "View Equipment"
						}), /* @__PURE__ */ jsx("a", {
							href: "/services",
							className: "inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
							children: "View Services"
						})]
					})
				] })
			})
		}), /* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:items-start lg:gap-14",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "max-w-3xl lg:col-span-5",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
							children: "Where We Operate"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
							children: "Regional Markets Petra Knows"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 text-lg leading-8 text-neutral-600",
							children: "If equipment is moving in these areas—we're usually already connected to it."
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "lg:col-span-7",
					children: /* @__PURE__ */ jsx("div", {
						className: "border border-[#dad5cb] bg-white p-6 sm:p-8",
						children: /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 gap-px bg-[#dad5cb] sm:grid-cols-2",
							children: [
								"Wyoming oilfields (Powder River, Jonah, Green River Basin)",
								"North Dakota (Bakken)",
								"Colorado energy corridors",
								"Utah & New Mexico producing regions",
								"Montana industrial yards",
								"Regional surplus equipment yards and private sellers"
							].map((region) => /* @__PURE__ */ jsxs("article", {
								className: "flex min-h-24 items-start gap-4 bg-white p-5",
								children: [/* @__PURE__ */ jsx(FeatureIcon, {
									type: "check",
									className: "mt-1 h-5 w-5 shrink-0"
								}), /* @__PURE__ */ jsx("h3", {
									className: "font-heading text-lg font-semibold uppercase leading-snug tracking-[0.08em] text-neutral-950",
									children: region
								})]
							}, region))
						})
					})
				})]
			})
		})]
	})] });
}
var legal_pages_default = {
	privacy: {
		"title": "Privacy Policy",
		"metaTitle": "Privacy Policy | Petra",
		"description": "Petra's privacy policy for visitors using the public used oilfield and industrial equipment brokerage website.",
		"eyebrow": "Privacy",
		"intro": "This policy explains how Petra handles basic information connected to public website inquiries and equipment brokerage conversations.",
		"sections": [
			{
				"heading": "Information You Provide",
				"body": "You may provide contact details, equipment descriptions, location notes, photos, documents, or request details when discussing equipment brokerage, sourcing, or sale opportunities."
			},
			{
				"heading": "How Information Is Used",
				"body": "Petra uses submitted information to review equipment opportunities, respond to buyer or seller requests, assess market fit, coordinate brokerage conversations, and improve public website content."
			},
			{
				"heading": "Operational Sharing",
				"body": "Equipment details may be shared with relevant buyers, sellers, logistics contacts, or service providers when needed to evaluate or move a potential transaction."
			},
			{
				"heading": "Retention",
				"body": "Information may be retained when it supports active brokerage conversations, recordkeeping, business operations, or future equipment sourcing needs."
			}
		]
	},
	terms: {
		"title": "Terms of Service",
		"metaTitle": "Terms of Service | Petra",
		"description": "Terms for using Petra's public used oilfield and industrial equipment brokerage website.",
		"eyebrow": "Terms",
		"intro": "These terms cover general use of Petra's public website and equipment brokerage information.",
		"sections": [
			{
				"heading": "Website Use",
				"body": "The website is provided for general information about Petra's used oilfield and industrial equipment brokerage work. You agree not to misuse the site or interfere with its operation."
			},
			{
				"heading": "Equipment Information",
				"body": "Equipment descriptions, availability, condition, specifications, and regional notes may change. Public website content should not be treated as a final offer, warranty, or transaction document."
			},
			{
				"heading": "Brokerage Conversations",
				"body": "Any transaction, sourcing request, sale discussion, inspection, logistics plan, or documentation requirement must be confirmed through direct business communication."
			},
			{
				"heading": "No Guaranteed Outcome",
				"body": "Petra may review equipment opportunities and buyer requests, but no sale, purchase, valuation, sourcing result, or timeline is guaranteed through website use."
			}
		]
	},
	cookies: {
		"title": "Cookie Policy",
		"metaTitle": "Cookie Policy | Petra",
		"description": "Cookie policy for Petra's public used oilfield and industrial equipment brokerage website.",
		"eyebrow": "Cookies",
		"intro": "This page explains the basic role cookies and similar browser technologies may play on Petra's public website.",
		"sections": [
			{
				"heading": "Site Function",
				"body": "Cookies or similar storage may support basic website functionality, preferences, security, analytics, or performance measurement."
			},
			{
				"heading": "Analytics and Performance",
				"body": "Petra may review aggregated website activity to understand page usage, improve content, and keep public equipment brokerage pages useful."
			},
			{
				"heading": "Browser Controls",
				"body": "Most browsers allow you to block, delete, or limit cookies. Some site features may not work as expected if browser storage is disabled."
			},
			{
				"heading": "Policy Updates",
				"body": "This policy may be updated as website tools, analytics practices, or public site features change."
			}
		]
	},
	disclaimer: {
		"title": "Disclaimer",
		"metaTitle": "Disclaimer | Petra",
		"description": "Website disclaimer for Petra's used oilfield and industrial equipment brokerage information.",
		"eyebrow": "Disclaimer",
		"intro": "This disclaimer explains the limits of public website information about equipment, brokerage, sourcing, and market context.",
		"sections": [
			{
				"heading": "General Information",
				"body": "Website content is provided for general informational purposes and does not replace direct review, inspection, documentation, or transaction-specific communication."
			},
			{
				"heading": "Equipment Condition",
				"body": "Condition, specifications, availability, location, and suitability must be verified before any buyer, seller, or operator relies on an equipment opportunity."
			},
			{
				"heading": "Market Context",
				"body": "Market movement, buyer demand, sourcing availability, and regional fit can change quickly. Petra does not guarantee pricing, liquidity, or transaction outcomes based on public content."
			},
			{
				"heading": "Third-Party Details",
				"body": "Some equipment information may originate from sellers, operators, yards, or other third parties and must be confirmed before use in a transaction."
			}
		]
	}
};
//#endregion
//#region resources/js/Pages/LegalPage.tsx
var LegalPage_exports = /* @__PURE__ */ __exportAll({ default: () => LegalPage });
function LegalPage({ pageKey, canonicalUrl }) {
	const page = legal_pages_default[pageKey];
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: page.title,
		url: canonicalUrl,
		description: page.description
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: page.metaTitle,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: page.description
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "canonical",
				href: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "robots",
				content: "noindex, follow"
			}),
			/* @__PURE__ */ jsx("script", {
				type: "application/ld+json",
				children: JSON.stringify(structuredData)
			})
		]
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [/* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[960px] px-5 py-20 sm:px-10 lg:py-24",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
						children: page.eyebrow
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-5 font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem]",
						children: page.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg",
						children: page.intro
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-5 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500",
						children: "Last updated July 8, 2026"
					})
				]
			})
		}), /* @__PURE__ */ jsx("section", {
			className: "py-16 sm:py-20",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto grid max-w-[960px] grid-cols-1 gap-px bg-[#dad5cb] px-5 sm:px-10",
				children: page.sections.map((section) => /* @__PURE__ */ jsxs("article", {
					className: "bg-white p-7 sm:p-8",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
						children: section.heading
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-4 text-base leading-7 text-neutral-600",
						children: section.body
					})]
				}, section.heading))
			})
		})]
	})] });
}
//#endregion
//#region resources/js/Components/portal-shell.tsx
var navItems$1 = [
	{
		label: "Dashboard",
		path: "dashboard",
		real: true
	},
	{
		label: "Saved Equipment",
		path: "saved-equipment",
		real: false
	},
	{
		label: "Quotes",
		path: "quotes",
		real: false
	},
	{
		label: "Offers",
		path: "offers",
		real: false
	},
	{
		label: "Documents",
		path: "documents",
		real: false
	},
	{
		label: "Messages",
		path: "messages",
		real: false
	},
	{
		label: "Notifications",
		path: "notifications",
		real: false
	},
	{
		label: "Profile",
		path: "profile",
		real: true
	}
];
function hrefFor(portal, path) {
	if (path === "dashboard") return `/${portal.userType}/dashboard`;
	return `/${portal.userType}/${path}`;
}
function PortalShell({ portal, title, eyebrow, children }) {
	const page = usePage();
	const { auth } = page.props;
	const currentPath = page.url.split("?")[0];
	function logout() {
		router.post("/logout");
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "min-h-screen bg-[#f3f1ec] text-neutral-950 lg:grid lg:grid-cols-[288px_minmax(0,1fr)]",
		children: [/* @__PURE__ */ jsxs("aside", {
			className: "border-b border-[#dad5cb] bg-white lg:min-h-screen lg:border-b-0 lg:border-r",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between border-b border-[#dad5cb] px-5 py-4 lg:block lg:px-6 lg:py-7",
				children: [/* @__PURE__ */ jsxs(Link, {
					href: `/${portal.userType}/dashboard`,
					className: "focus-copper block w-fit",
					children: [/* @__PURE__ */ jsx("span", {
						className: "block font-heading text-[1.65rem] font-semibold uppercase tracking-[0.22em] text-neutral-950",
						children: "Petra"
					}), /* @__PURE__ */ jsx("span", {
						className: "mt-1 block font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#a56437]",
						children: eyebrow ?? `${portal.roleLabel} Portal`
					})]
				}), /* @__PURE__ */ jsx("span", {
					className: "border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-neutral-600 lg:mt-6 lg:inline-block",
					children: portal.roleLabel
				})]
			}), /* @__PURE__ */ jsx("nav", {
				"aria-label": `${portal.roleLabel} portal navigation`,
				className: "overflow-x-auto lg:overflow-visible",
				children: /* @__PURE__ */ jsx("div", {
					className: "flex min-w-max lg:grid lg:min-w-0",
					children: navItems$1.map((item) => {
						const href = hrefFor(portal, item.path);
						const active = currentPath === href;
						return /* @__PURE__ */ jsxs(Link, {
							href,
							"aria-current": active ? "page" : void 0,
							className: `flex min-h-14 items-center justify-between gap-4 border-r border-[#dad5cb] px-5 py-4 font-heading text-base font-semibold uppercase tracking-[0.08em] transition-colors last:border-r-0 lg:border-r-0 lg:border-b ${active ? "bg-[#f3f1ec] text-[#a56437] lg:shadow-[inset_4px_0_0_#a56437]" : "bg-white text-neutral-700 hover:bg-[#f8f8f6] hover:text-neutral-950"}`,
							children: [/* @__PURE__ */ jsx("span", { children: item.label }), !item.real && /* @__PURE__ */ jsx("span", {
								className: "text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400 lg:block",
								children: "Soon"
							})]
						}, item.path);
					})
				})
			})]
		}), /* @__PURE__ */ jsxs("section", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("header", {
				className: "border-b border-[#dad5cb] bg-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-5 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-heading text-sm font-semibold uppercase tracking-[0.18em] text-[#a56437]",
								children: eyebrow ?? `${portal.roleLabel} Portal`
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "mt-2 break-words font-heading text-3xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-4xl",
								children: title
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-2 text-sm leading-6 text-neutral-600 sm:text-base",
								children: ["Signed in as ", auth.user?.name ?? portal.profileName]
							})
						]
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: logout,
						className: "button-press focus-copper inline-flex h-11 w-fit items-center justify-center border border-neutral-500 px-6 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
						children: "Log out"
					})]
				})
			}), /* @__PURE__ */ jsx("div", {
				className: "px-5 py-6 sm:px-8 lg:px-10 lg:py-8",
				children
			})]
		})]
	});
}
//#endregion
//#region resources/js/Pages/Portal/Dashboard.tsx
var Dashboard_exports = /* @__PURE__ */ __exportAll({ default: () => Dashboard });
function Dashboard({ portal }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${portal.roleLabel} Dashboard` }), /* @__PURE__ */ jsx(PortalShell, {
		portal,
		title: `${portal.roleLabel} Dashboard`,
		children: /* @__PURE__ */ jsxs("section", {
			className: "grid gap-6",
			children: [/* @__PURE__ */ jsxs("article", {
				className: "border border-[#dad5cb] bg-white p-7 sm:p-8",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
						children: "Overview"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-4 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
						children: "Activity Summary"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-5 max-w-3xl text-base leading-7 text-neutral-600",
						children: portal.summary
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-3",
				children: [
					"Saved Equipment",
					"Quotes",
					"Messages"
				].map((label) => /* @__PURE__ */ jsxs("article", {
					className: "bg-white p-6",
					children: [
						/* @__PURE__ */ jsx("div", { className: "mb-5 h-1.5 w-1.5 bg-[#a56437]" }),
						/* @__PURE__ */ jsx("h3", {
							className: "font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
							children: label
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-4 text-sm leading-6 text-neutral-600",
							children: [
								"Coming soon once the ",
								label.toLowerCase(),
								" data model is defined."
							]
						})
					]
				}, label))
			})]
		})
	})] });
}
//#endregion
//#region resources/js/Pages/Portal/Placeholder.tsx
var Placeholder_exports = /* @__PURE__ */ __exportAll({ default: () => Placeholder });
var sectionLabels = {
	"saved-equipment": "Saved Equipment",
	quotes: "Quotes",
	offers: "Offers",
	documents: "Documents",
	messages: "Messages",
	notifications: "Notifications"
};
function Placeholder({ portal, section }) {
	const title = sectionLabels[section] ?? "Coming Soon";
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${title} | ${portal.roleLabel} Portal` }), /* @__PURE__ */ jsx(PortalShell, {
		portal,
		title,
		children: /* @__PURE__ */ jsxs("article", {
			className: "border border-[#dad5cb] bg-white p-7 sm:p-8",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
					children: "Coming Soon"
				}),
				/* @__PURE__ */ jsxs("h2", {
					className: "mt-4 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
					children: [title, " is a later phase"]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-5 max-w-3xl text-base leading-7 text-neutral-600",
					children: "The sitemap names this section, but it does not yet define the underlying object model, workflow states, or permissions. This pass only reserves the route and navigation entry."
				}),
				section === "saved-equipment" && /* @__PURE__ */ jsxs("p", {
					className: "mt-4 max-w-3xl text-base leading-7 text-neutral-600",
					children: [
						"For ",
						portal.roleLabel.toLowerCase(),
						" accounts, the saved-equipment behavior still needs a product decision before data is wired."
					]
				})
			]
		})
	})] });
}
//#endregion
//#region resources/js/Pages/Portal/Profile.tsx
var Profile_exports = /* @__PURE__ */ __exportAll({ default: () => Profile });
function Profile({ portal }) {
	const { auth, status } = usePage().props;
	const user = auth.user;
	const profileForm = useForm({
		name: user?.name ?? "",
		email: user?.email ?? "",
		phone: user?.phone ?? "",
		company_name: user?.company_name ?? ""
	});
	const passwordForm = useForm({
		current_password: "",
		password: "",
		password_confirmation: ""
	});
	function updateProfile(event) {
		event.preventDefault();
		profileForm.patch(`/${portal.userType}/profile`, { preserveScroll: true });
	}
	function updatePassword(event) {
		event.preventDefault();
		passwordForm.put(`/${portal.userType}/profile/password`, {
			preserveScroll: true,
			onSuccess: () => passwordForm.reset()
		});
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Profile" }), /* @__PURE__ */ jsx(PortalShell, {
		portal,
		title: "Profile",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6",
			children: [
				status && /* @__PURE__ */ jsx("div", {
					className: "border border-[#a56437] bg-white p-4 text-base leading-7 text-neutral-700",
					children: status
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: updateProfile,
					className: "grid gap-5 border border-[#dad5cb] bg-white p-7 sm:grid-cols-2 sm:p-8",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Account"
							}), /* @__PURE__ */ jsx("h2", {
								className: "mt-4 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
								children: "Contact Details"
							})]
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Name",
							error: profileForm.errors.name,
							children: /* @__PURE__ */ jsx("input", {
								value: profileForm.data.name,
								onChange: (event) => profileForm.setData("name", event.target.value),
								className: "portal-input",
								autoComplete: "name",
								required: true
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Email",
							error: profileForm.errors.email,
							children: /* @__PURE__ */ jsx("input", {
								type: "email",
								value: profileForm.data.email,
								onChange: (event) => profileForm.setData("email", event.target.value),
								className: "portal-input",
								autoComplete: "email",
								required: true
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Phone",
							error: profileForm.errors.phone,
							children: /* @__PURE__ */ jsx("input", {
								value: profileForm.data.phone,
								onChange: (event) => profileForm.setData("phone", event.target.value),
								className: "portal-input",
								autoComplete: "tel"
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Company",
							error: profileForm.errors.company_name,
							children: /* @__PURE__ */ jsx("input", {
								value: profileForm.data.company_name,
								onChange: (event) => profileForm.setData("company_name", event.target.value),
								className: "portal-input",
								autoComplete: "organization"
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Role",
							children: /* @__PURE__ */ jsx("input", {
								value: user?.user_type_label ?? portal.roleLabel,
								className: "portal-input bg-[#f3f1ec] text-neutral-600",
								readOnly: true
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "self-end",
							children: /* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: profileForm.processing,
								className: "button-press focus-copper inline-flex h-12 items-center justify-center bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
								children: profileForm.processing ? "Saving" : "Save profile"
							})
						})
					]
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: updatePassword,
					className: "grid gap-5 border border-[#dad5cb] bg-white p-7 sm:p-8",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
							children: "Security"
						}), /* @__PURE__ */ jsx("h2", {
							className: "mt-4 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
							children: "Change Password"
						})] }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-5 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ jsx(Field, {
									label: "Current password",
									error: passwordForm.errors.current_password,
									children: /* @__PURE__ */ jsx("input", {
										type: "password",
										value: passwordForm.data.current_password,
										onChange: (event) => passwordForm.setData("current_password", event.target.value),
										className: "portal-input",
										autoComplete: "current-password",
										required: true
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "New password",
									error: passwordForm.errors.password,
									children: /* @__PURE__ */ jsx("input", {
										type: "password",
										value: passwordForm.data.password,
										onChange: (event) => passwordForm.setData("password", event.target.value),
										className: "portal-input",
										autoComplete: "new-password",
										required: true
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Confirm password",
									error: passwordForm.errors.password_confirmation,
									children: /* @__PURE__ */ jsx("input", {
										type: "password",
										value: passwordForm.data.password_confirmation,
										onChange: (event) => passwordForm.setData("password_confirmation", event.target.value),
										className: "portal-input",
										autoComplete: "new-password",
										required: true
									})
								})
							]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: passwordForm.processing,
							className: "button-press focus-copper inline-flex h-12 w-fit items-center justify-center border border-neutral-500 px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white disabled:opacity-60",
							children: passwordForm.processing ? "Updating" : "Update password"
						})
					]
				})
			]
		})
	})] });
}
function Field({ label, error, children }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
				children: label
			}),
			children,
			error && /* @__PURE__ */ jsx("span", {
				className: "text-sm text-red-700",
				children: error
			})
		]
	});
}
var request_equipment_default = {
	heroImage: "/images/petra-equipment-yard-hero.png",
	requestedAssets: [
		"Compressors",
		"Separators",
		"Pump packages",
		"Tank batteries",
		"Production equipment",
		"Hard-to-source surplus"
	],
	processSteps: [
		{
			"number": "01",
			"title": "Send the Spec",
			"description": "Share the equipment type, required size, service conditions, location needs, and timing."
		},
		{
			"number": "02",
			"title": "Check the Network",
			"description": "Petra reviews active sellers, regional surplus, operator relationships, and quiet-market availability."
		},
		{
			"number": "03",
			"title": "Verify Fit",
			"description": "We compare condition, documents, field use, logistics, and practical buyer requirements before presenting options."
		},
		{
			"number": "04",
			"title": "Move the Deal",
			"description": "When a fit is real, Petra supports buyer questions, seller coordination, negotiation, and next-step logistics."
		}
	],
	requirements: [
		"The right size",
		"The right spec",
		"The right condition",
		"And someone who actually knows where to find it"
	],
	buyerBenefits: [
		{
			"title": "Specific Asset Sourcing",
			"description": "Petra is built for buyers who need a real fit, not a long list of irrelevant public listings."
		},
		{
			"title": "Quiet-Market Access",
			"description": "Some equipment moves through operator relationships and regional sellers before it ever reaches an open marketplace."
		},
		{
			"title": "Practical Verification",
			"description": "We focus on condition, specs, documentation, site fit, and logistics before a buyer wastes time."
		}
	],
	regions: [
		"Wyoming",
		"Powder River",
		"Rockies",
		"Bakken",
		"North Dakota",
		"Colorado",
		"Utah",
		"New Mexico",
		"Montana"
	],
	faqs: [
		{
			"question": "Can Petra source equipment that is not listed publicly?",
			"answer": "Yes. Petra can review buyer requirements against active sellers, regional surplus, operator relationships, and quiet-market opportunities."
		},
		{
			"question": "What information should a buyer provide?",
			"answer": "The most useful details are equipment type, required specs, location needs, condition requirements, timing, budget range, and documentation needs."
		},
		{
			"question": "Does Petra only work in oilfield equipment?",
			"answer": "Petra focuses on used oilfield and industrial equipment, including compressors, separators, pump packages, tank batteries, production equipment, and related surplus assets."
		}
	]
};
//#endregion
//#region resources/js/Pages/RequestEquipment.tsx
var RequestEquipment_exports = /* @__PURE__ */ __exportAll({ default: () => RequestEquipment });
var { heroImage: heroImage$4, requestedAssets, processSteps: processSteps$2, requirements: requirements$2, buyerBenefits, regions: regions$2, faqs: faqs$4 } = request_equipment_default;
var pageTitle$2 = "Request Equipment | Petra Equipment Sourcing";
var pageDescription$2 = "Most buyers do not need more listings. Petra helps source the right size, spec, condition, and equipment fit through people who know where to find it.";
function RequestEquipment({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "Service",
			"@id": `${canonicalUrl}#equipment-sourcing-service`,
			name: "Used oilfield equipment sourcing for buyers",
			url: canonicalUrl,
			description: pageDescription$2,
			provider: {
				"@type": "Organization",
				name: "Petra",
				url: canonicalUrl.replace(/\/request-equipment$/, "")
			},
			areaServed: regions$2,
			serviceType: "Used oilfield and industrial equipment sourcing"
		}, {
			"@type": "BreadcrumbList",
			"@id": `${canonicalUrl}#breadcrumbs`,
			itemListElement: [{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: canonicalUrl.replace(/\/request-equipment$/, "")
			}, {
				"@type": "ListItem",
				position: 2,
				name: "Request Equipment",
				item: canonicalUrl
			}]
		}]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: pageTitle$2,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: pageDescription$2
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "canonical",
				href: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "robots",
				content: "index, follow"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:title",
				content: pageTitle$2
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: pageDescription$2
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:type",
				content: "website"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:url",
				content: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image:alt",
				content: "Oilfield equipment yard represented by Petra for equipment sourcing."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: pageTitle$2
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: pageDescription$2
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("script", {
				type: "application/ld+json",
				children: JSON.stringify(structuredData)
			})
		]
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-white",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-24",
					children: /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h1", {
							className: "max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]",
							children: "Request Equipment"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg",
							children: "Most buyers do not need more listings. They need the right size, the right spec, the right condition, and someone who actually knows where to find it."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-10 flex flex-col gap-4 sm:flex-row",
							children: [/* @__PURE__ */ jsx("a", {
								href: "#buyer-request",
								className: "inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
								children: "Request Equipment"
							}), /* @__PURE__ */ jsx("a", {
								href: "/equipment",
								className: "inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
								children: "View Equipment"
							})]
						})
					] })
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 sm:px-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-12 max-w-3xl",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
							children: "Sourcing Process"
						}), /* @__PURE__ */ jsx("h2", {
							className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
							children: "How Petra Sources Equipment"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-4",
						children: processSteps$2.map((step) => /* @__PURE__ */ jsxs("article", {
							className: "bg-white p-7",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-heading text-3xl font-semibold uppercase tracking-[0.05em] text-[#a56437]",
									children: step.number
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-8 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
									children: step.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 text-base leading-7 text-neutral-600",
									children: step.description
								})
							]
						}, step.number))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "buyer-request",
				className: "bg-[#f3f1ec] py-20 sm:py-24 lg:py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:items-start lg:gap-14",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "max-w-3xl lg:col-span-5",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "What Buyers Need"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
								children: "Most buyers do not need more listings."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-6 text-lg leading-8 text-neutral-600",
								children: "They need:"
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ jsxs("div", {
							className: "border border-[#dad5cb] bg-white p-6 sm:p-8",
							children: [/* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-1 gap-px bg-[#dad5cb] sm:grid-cols-2",
								children: requirements$2.map((requirement) => /* @__PURE__ */ jsxs("article", {
									className: "flex min-h-24 items-start gap-4 bg-white p-5",
									children: [/* @__PURE__ */ jsx(FeatureIcon, {
										type: "check",
										className: "mt-1 h-5 w-5 shrink-0"
									}), /* @__PURE__ */ jsx("h3", {
										className: "font-heading text-lg font-semibold uppercase leading-snug tracking-[0.08em] text-neutral-950",
										children: requirement
									})]
								}, requirement))
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-6 border-t border-[#dad5cb] pt-6 text-lg leading-8 text-neutral-600",
								children: "Tell us what you're trying to source."
							})]
						})
					})]
				})
			})
		]
	})] });
}
var sell_equipment_default = {
	heroImage: "/images/petra-equipment-yard-hero.png",
	assetTypes: [
		"Compressors",
		"Separators",
		"Tanks",
		"Pump packages",
		"Generators",
		"Flowback equipment",
		"Yard surplus inventory",
		"Full packages or single assets"
	],
	processSteps: [
		{
			"number": "01",
			"title": "Send equipment info",
			"description": "Share what you have: equipment details, location, condition, photos, and available documents."
		},
		{
			"number": "02",
			"title": "We review the asset",
			"description": "Petra reviews the equipment, market fit, likely buyers, and whether the pricing aligns with current demand."
		},
		{
			"number": "03",
			"title": "We position it",
			"description": "We represent the equipment clearly so serious buyers understand condition, specs, location, and practical value."
		},
		{
			"number": "04",
			"title": "We handle negotiation",
			"description": "Petra works the buyer conversations, answers practical questions, and keeps the deal moving."
		},
		{
			"number": "05",
			"title": "You receive actual offers",
			"description": "When there is a real fit, you get offers from buyers who are actually in the market."
		}
	],
	requirements: [
		"Equipment details",
		"Location",
		"Condition (rough is fine)",
		"Photos",
		"Documents"
	],
	sellerBenefits: [
		{
			"title": "No Auction Guesswork",
			"description": "Petra focuses on direct buyer conversations, practical valuation, and controlled exposure."
		},
		{
			"title": "Field-Aware Positioning",
			"description": "Listings are framed around how operators evaluate equipment: condition, fit, documents, and logistics."
		},
		{
			"title": "Regional Buyer Network",
			"description": "We work across Wyoming, the Rockies, the Bakken, North Dakota, Colorado, Utah, New Mexico, and Montana."
		}
	],
	faqs: [
		{
			"question": "What equipment can Petra help sell?",
			"answer": "Petra focuses on used oilfield and industrial assets such as compressors, separators, tank batteries, pump packages, production equipment, and regional surplus."
		},
		{
			"question": "Do I need perfect documentation before reaching out?",
			"answer": "No. Photos, core specs, location, and condition notes are enough to start a review. Strong documentation helps position the asset more accurately."
		},
		{
			"question": "Is this a public auction process?",
			"answer": "No. Petra is built around brokerage, direct buyer conversations, equipment positioning, and practical deal support."
		}
	]
};
//#endregion
//#region resources/js/Pages/SellEquipment.tsx
var SellEquipment_exports = /* @__PURE__ */ __exportAll({ default: () => SellEquipment });
var { heroImage: heroImage$2, assetTypes, processSteps, requirements, sellerBenefits, faqs: faqs$2 } = sell_equipment_default;
var pageTitle$1 = "Sell Your Equipment | Petra Equipment Brokerage";
var pageDescription$1 = "Got equipment sitting in a yard or out in the field? Petra helps you turn unused oilfield and industrial equipment into real buyers.";
function SellEquipment({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "Service",
			"@id": `${canonicalUrl}#sell-equipment-service`,
			name: "Used oilfield equipment brokerage for sellers",
			url: canonicalUrl,
			description: pageDescription$1,
			provider: {
				"@type": "Organization",
				name: "Petra",
				url: canonicalUrl.replace(/\/sell-equipment$/, "")
			},
			areaServed: [
				"Wyoming",
				"Rockies",
				"Bakken",
				"North Dakota",
				"Colorado",
				"Utah",
				"New Mexico",
				"Montana"
			],
			serviceType: "Used oilfield and industrial equipment brokerage"
		}, {
			"@type": "BreadcrumbList",
			"@id": `${canonicalUrl}#breadcrumbs`,
			itemListElement: [{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: canonicalUrl.replace(/\/sell-equipment$/, "")
			}, {
				"@type": "ListItem",
				position: 2,
				name: "Sell Equipment",
				item: canonicalUrl
			}]
		}]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: pageTitle$1,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: pageDescription$1
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "canonical",
				href: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "robots",
				content: "index, follow"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:title",
				content: pageTitle$1
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: pageDescription$1
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:type",
				content: "website"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:url",
				content: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image:alt",
				content: "Oilfield equipment yard represented by Petra for used equipment sellers."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: pageTitle$1
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: pageDescription$1
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("script", {
				type: "application/ld+json",
				children: JSON.stringify(structuredData)
			})
		]
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-white",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-24",
					children: /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h1", {
							className: "max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]",
							children: "Sell Your Equipment"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg",
							children: "Got equipment sitting in a yard or out in the field? We help you turn unused oilfield and industrial equipment into real buyers."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-10 flex flex-col gap-4 sm:flex-row",
							children: [/* @__PURE__ */ jsx("a", {
								href: "#seller-intake",
								className: "inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
								children: "Submit Equipment"
							}), /* @__PURE__ */ jsx("a", {
								href: "/equipment",
								className: "inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
								children: "View Equipment"
							})]
						})
					] })
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-[#f3f1ec] py-20 sm:py-24 lg:py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:items-start lg:gap-14",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "max-w-4xl lg:col-span-5",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Reality Check"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
								children: "Most equipment doesn't fail to sell because it's bad."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-6 text-lg leading-8 text-neutral-600",
								children: "It fails because:"
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ jsxs("div", {
							className: "border border-[#dad5cb] bg-white p-6 sm:p-8",
							children: [/* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-3",
								children: [
									"nobody is actively marketing it",
									"it's stuck in a small network",
									"or pricing isn't aligned with the market"
								].map((item) => /* @__PURE__ */ jsxs("article", {
									className: "flex min-h-24 items-start gap-4 bg-white p-5",
									children: [/* @__PURE__ */ jsx(FeatureIcon, {
										type: "check",
										className: "mt-1 h-5 w-5 shrink-0"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-base leading-7 text-neutral-700",
										children: item
									})]
								}, item))
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-6 border-t border-[#dad5cb] pt-6 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
								children: "We fix that."
							})]
						})
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-[#1c1a16] text-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 py-12 sm:px-10",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mx-auto mb-9 max-w-3xl text-center",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-heading text-sm font-semibold uppercase tracking-[0.24em] text-[#b06b3d]",
								children: "What You Can Send"
							}), /* @__PURE__ */ jsx("h2", {
								className: "mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl",
								children: "What You Can Send"
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-2 gap-px bg-white/15 md:grid-cols-4",
							children: assetTypes.map((assetType) => /* @__PURE__ */ jsxs("div", {
								className: "bg-[#1c1a16] p-5 text-center transition-colors hover:bg-[#24211c]",
								children: [/* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 h-1.5 w-1.5 bg-[#a56437]" }), /* @__PURE__ */ jsx("h3", {
									className: "font-heading text-lg font-semibold uppercase tracking-[0.08em] text-white",
									children: assetType
								})]
							}, assetType))
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mx-auto mt-9 max-w-3xl text-center text-lg leading-8 text-white/70",
							children: "If you're not sure it's sellable—send it anyway."
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 sm:px-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-12 max-w-3xl",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
							children: "Seller Process"
						}), /* @__PURE__ */ jsx("h2", {
							className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
							children: "How Petra Handles a Sale"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-2 lg:grid-cols-5",
						children: processSteps.map((step) => /* @__PURE__ */ jsxs("article", {
							className: "bg-white p-7",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-heading text-3xl font-semibold uppercase tracking-[0.05em] text-[#a56437]",
									children: step.number
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-8 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
									children: step.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 text-base leading-7 text-neutral-600",
									children: step.description
								})
							]
						}, step.number))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "seller-intake",
				className: "bg-[#f3f1ec] py-20 sm:py-24 lg:py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 sm:px-10",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mb-12 max-w-3xl",
							children: [/* @__PURE__ */ jsx("span", {
								className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Submit Equipment"
							}), /* @__PURE__ */ jsx("h2", {
								className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
								children: "What We Need"
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 gap-px bg-[#dad5cb] sm:grid-cols-2 lg:grid-cols-5",
							children: requirements.map((requirement) => /* @__PURE__ */ jsxs("article", {
								className: "bg-white p-7",
								children: [/* @__PURE__ */ jsx(FeatureIcon, {
									type: "check",
									className: "mb-6 h-5 w-5"
								}), /* @__PURE__ */ jsx("h3", {
									className: "font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
									children: requirement
								})]
							}, requirement))
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-10 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
							children: "We don't let equipment sit. If it can move, we move it."
						})
					]
				})
			})
		]
	})] });
}
var services_default = {
	heroImage: "/images/petra-equipment-yard-hero.png",
	services: [
		{
			"title": "Equipment Brokerage",
			"summary": "Petra connects sellers and buyers around used oilfield and industrial equipment without a public auction process.",
			"details": [
				"Seller positioning",
				"Buyer qualification",
				"Negotiation support"
			]
		},
		{
			"title": "Asset Sourcing",
			"summary": "Petra helps buyers locate specific equipment through regional sellers, operator relationships, and quiet-market opportunities.",
			"details": [
				"Spec review",
				"Network search",
				"Fit verification"
			]
		},
		{
			"title": "Market Review",
			"summary": "Petra reviews equipment condition, documentation, field use, and practical market fit before a buyer or seller commits time.",
			"details": [
				"Condition context",
				"Regional demand",
				"Deal readiness"
			]
		},
		{
			"title": "Logistics Coordination",
			"summary": "Petra keeps logistics visible early so equipment movement, access, timing, and buyer expectations do not derail a deal.",
			"details": [
				"Location review",
				"Access notes",
				"Timing support"
			]
		}
	],
	workflow: [
		{
			"number": "01",
			"title": "Understand the Asset",
			"description": "We start with the equipment, region, condition, specs, documentation, and what the seller or buyer is trying to accomplish."
		},
		{
			"number": "02",
			"title": "Position the Opportunity",
			"description": "Petra frames the deal around field reality: use case, market fit, condition, logistics, and practical buyer questions."
		},
		{
			"number": "03",
			"title": "Connect the Right Side",
			"description": "We put sellers and buyers into relevant conversations instead of broadcasting equipment to everyone."
		},
		{
			"number": "04",
			"title": "Support the Deal",
			"description": "Petra helps carry the conversation through documentation, negotiation, timing, and movement planning."
		}
	],
	regions: [
		"Wyoming",
		"Powder River",
		"Rockies",
		"Bakken",
		"North Dakota",
		"Colorado",
		"Utah",
		"New Mexico",
		"Montana"
	],
	faqs: [
		{
			"question": "Is Petra an auction company?",
			"answer": "No. Petra is a brokerage-focused equipment firm built around direct buyer and seller conversations, practical equipment review, and controlled deal support."
		},
		{
			"question": "Can Petra help both buyers and sellers?",
			"answer": "Yes. Petra supports sellers looking to move used equipment and buyers looking to source specific oilfield or industrial assets."
		},
		{
			"question": "What regions does Petra serve?",
			"answer": "Petra works across Wyoming, the Powder River, the Rockies, the Bakken, North Dakota, Colorado, Utah, New Mexico, Montana, and surrounding producing regions."
		}
	]
};
//#endregion
//#region resources/js/Pages/Services.tsx
var Services_exports = /* @__PURE__ */ __exportAll({ default: () => Services });
var { heroImage, services, workflow, regions, faqs } = services_default;
var pageTitle = "Services | Petra";
var pageDescription = "Straight brokerage work between people who actually understand field equipment. Petra helps sellers move surplus equipment and buyers source the right assets.";
function Services({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "Service",
			"@id": `${canonicalUrl}#equipment-brokerage-services`,
			name: "Oilfield equipment brokerage services",
			url: canonicalUrl,
			description: pageDescription,
			provider: {
				"@type": "Organization",
				name: "Petra",
				url: canonicalUrl.replace(/\/services$/, "")
			},
			areaServed: regions,
			serviceType: ["Equipment brokerage", "Equipment sourcing"]
		}, {
			"@type": "BreadcrumbList",
			"@id": `${canonicalUrl}#breadcrumbs`,
			itemListElement: [{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: canonicalUrl.replace(/\/services$/, "")
			}, {
				"@type": "ListItem",
				position: 2,
				name: "Services",
				item: canonicalUrl
			}]
		}]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: pageTitle,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: pageDescription
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "canonical",
				href: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "robots",
				content: "index, follow"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:title",
				content: pageTitle
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: pageDescription
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:type",
				content: "website"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:url",
				content: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image:alt",
				content: "Oilfield equipment yard represented by Petra brokerage services."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: pageTitle
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: pageDescription
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("script", {
				type: "application/ld+json",
				children: JSON.stringify(structuredData)
			})
		]
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [/* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-24",
				children: /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("h1", {
						className: "max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]",
						children: "Services"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg",
						children: "Just straight brokerage work between people who actually understand field equipment."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-10 flex flex-col gap-4 sm:flex-row",
						children: [/* @__PURE__ */ jsx("a", {
							href: "/sell-equipment",
							className: "inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
							children: "Sell Equipment"
						}), /* @__PURE__ */ jsx("a", {
							href: "/request-equipment",
							className: "inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
							children: "Request Equipment"
						})]
					})
				] })
			})
		}), /* @__PURE__ */ jsx("section", {
			className: "border-y border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-[1280px] grid-cols-1 px-5 sm:px-10 md:grid-cols-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col border-b border-[#dad5cb] py-20 md:border-b-0 md:border-r md:py-28 md:pr-16 lg:pr-20",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
							children: "Selling Equipment"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mb-8 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950",
							children: "Sell Your Equipment"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mb-10 text-lg leading-8 text-neutral-600",
							children: "Most companies do not lose money because the equipment is bad. They lose money because it sits too long, nobody markets it properly, or it is only shown to a small local network."
						}),
						/* @__PURE__ */ jsx("ul", {
							className: "mb-12 space-y-6",
							children: [
								"Get equipment in front of active buyers.",
								"Price it based on actual market movement, not guesswork.",
								"Handle buyer calls and negotiation.",
								"Move equipment without tying up your team."
							].map((item) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ jsx(FeatureIcon, {
									type: "check",
									className: "mt-0.5 h-5 w-5"
								}), /* @__PURE__ */ jsx("span", { children: item })]
							}, item))
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mb-12 text-lg leading-8 text-neutral-600",
							children: "If you've got surplus iron sitting in a yard in Wyoming, North Dakota, or Colorado—we'll help you turn it into capital again."
						}),
						/* @__PURE__ */ jsx("a", {
							href: "/sell-equipment",
							className: "mt-auto inline-flex h-16 w-fit items-center self-start bg-[#a56437] px-12 font-heading text-base font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90",
							children: "Sell Equipment"
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col py-20 md:py-28 md:pl-16 lg:pl-20",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
							children: "Looking for Equipment"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mb-8 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950",
							children: "Request Equipment"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mb-10 text-lg leading-8 text-neutral-600",
							children: "Most buyers do not need more listings. They need:"
						}),
						/* @__PURE__ */ jsx("ul", {
							className: "mb-12 space-y-6",
							children: [
								"The right size",
								"The right spec",
								"The right condition",
								"And someone who actually knows where to find it",
								"Tell us what you're trying to source.",
								"We work our network and come back with real options."
							].map((item) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ jsx(FeatureIcon, {
									type: "check",
									className: "mt-0.5 h-5 w-5"
								}), /* @__PURE__ */ jsx("span", { children: item })]
							}, item))
						}),
						/* @__PURE__ */ jsx("a", {
							href: "/request-equipment",
							className: "mt-auto inline-flex h-16 w-fit items-center self-start border border-neutral-950 px-12 font-heading text-base font-semibold uppercase tracking-[0.12em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
							children: "Request Equipment"
						})
					]
				})]
			})
		})]
	})] });
}
//#endregion
//#region resources/js/Components/footer.tsx
function AccentIcon({ type }) {
	return /* @__PURE__ */ jsx("svg", {
		className: "h-12 w-12 text-[#a56437]",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("path", {
			d: {
				globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-8-9h16M12 3c2.3 2.4 3.4 5.4 3.4 9S14.3 18.6 12 21c-2.3-2.4-3.4-5.4-3.4-9S9.7 5.4 12 3Z",
				mail: "M4 6h16v12H4V6Zm0 1.5 8 5.5 8-5.5",
				call: "M6.7 4.5 9 4l2 4-1.7 1.2c.9 1.8 2.3 3.2 4.1 4.1L14.7 12l4 2-.5 2.3c-.2 1-1.1 1.7-2.1 1.7C9.4 18 6 14.6 6 7.9c0-1 .7-1.9 1.7-2.1Z"
			}[type],
			stroke: "currentColor",
			strokeWidth: "1.7",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "reveal-up w-full border-t border-[#dad5cb] bg-white",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "stagger-children mx-auto grid max-w-[1280px] grid-cols-1 gap-14 px-5 py-20 sm:px-10 md:grid-cols-4 lg:py-24",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-8",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "font-heading text-3xl font-semibold uppercase tracking-[0.2em] text-neutral-950",
						children: "PETRA"
					}), /* @__PURE__ */ jsx("div", { className: "mt-3 h-0.5 w-16 bg-[#a56437]" })] }), /* @__PURE__ */ jsx("p", {
						className: "leading-7 text-neutral-600",
						children: "Used oilfield and industrial equipment brokerage serving Wyoming, the Rockies, and surrounding producing regions."
					})]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
					className: "mb-6 font-heading text-base font-semibold uppercase tracking-[0.12em] text-neutral-950",
					children: "Navigation"
				}), /* @__PURE__ */ jsxs("nav", {
					className: "flex flex-col gap-4 text-neutral-600",
					children: [
						/* @__PURE__ */ jsx("a", {
							className: "focus-copper transition-colors hover:text-[#a56437]",
							href: "/equipment",
							children: "Browse Equipment"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "focus-copper transition-colors hover:text-[#a56437]",
							href: "/sell-equipment",
							children: "Sell Equipment"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "focus-copper transition-colors hover:text-[#a56437]",
							href: "/request-equipment",
							children: "Request Equipment"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "focus-copper transition-colors hover:text-[#a56437]",
							href: "/contact",
							children: "Contact"
						})
					]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
					className: "mb-6 font-heading text-base font-semibold uppercase tracking-[0.12em] text-neutral-950",
					children: "Legal"
				}), /* @__PURE__ */ jsxs("nav", {
					className: "flex flex-col gap-4 text-neutral-600",
					children: [
						/* @__PURE__ */ jsx("a", {
							className: "focus-copper transition-colors hover:text-[#a56437]",
							href: "/privacy",
							children: "Privacy Policy"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "focus-copper transition-colors hover:text-[#a56437]",
							href: "/terms",
							children: "Terms of Service"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "focus-copper transition-colors hover:text-[#a56437]",
							href: "/cookies",
							children: "Cookie Policy"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "focus-copper transition-colors hover:text-[#a56437]",
							href: "/disclaimer",
							children: "Disclaimer"
						})
					]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("h3", {
						className: "mb-6 font-heading text-base font-semibold uppercase tracking-[0.12em] text-neutral-950",
						children: "Service Area"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "leading-8 text-neutral-600",
						children: [
							"Wyoming oilfields",
							/* @__PURE__ */ jsx("br", {}),
							"Rockies and Bakken",
							/* @__PURE__ */ jsx("br", {}),
							"Regional surplus yards"
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 flex gap-5 text-neutral-600",
						children: [
							/* @__PURE__ */ jsx(AccentIcon, { type: "globe" }),
							/* @__PURE__ */ jsx(AccentIcon, { type: "mail" }),
							/* @__PURE__ */ jsx(AccentIcon, { type: "call" })
						]
					})
				] })
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-[1280px] border-t border-[#dad5cb]/60 px-5 py-10 text-center sm:px-10",
			children: /* @__PURE__ */ jsx("p", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500",
				children: "© 2024 PETRA Used Oilfield & Industrial Equipment Brokerage. All rights reserved."
			})
		})]
	});
}
//#endregion
//#region resources/js/Components/nav-bar.tsx
var navItems = [
	{
		label: "Home",
		href: "/"
	},
	{
		label: "Equipment",
		href: "/equipment"
	},
	{
		label: "Sell Equipment",
		href: "/sell-equipment"
	},
	{
		label: "Request Equipment",
		href: "/request-equipment"
	},
	{
		label: "Services",
		href: "/services"
	},
	{
		label: "Industries",
		href: "/industries"
	}
];
function isActivePath(href) {
	if (typeof window === "undefined") return href === "/";
	const currentPath = window.location.pathname;
	if (href === "/") return currentPath === "/";
	return currentPath.startsWith(href);
}
function NavBar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const { auth } = usePage().props;
	function logout() {
		router.post("/logout");
	}
	return /* @__PURE__ */ jsxs("header", {
		className: "reveal-down sticky top-0 z-50 w-full border-b border-neutral-300 bg-[#f8f8f6]/95 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset] backdrop-blur-sm",
		children: [/* @__PURE__ */ jsxs("nav", {
			"aria-label": "Primary navigation",
			className: "mx-auto grid min-h-18 w-full max-w-[1200px] grid-cols-[auto_1fr_auto] items-center gap-6 px-5 sm:px-10 xl:px-0",
			children: [
				/* @__PURE__ */ jsx("a", {
					href: "/",
					className: "font-heading text-[1.8rem] font-semibold uppercase tracking-[0.22em] text-neutral-950",
					"aria-label": "Petra home",
					children: "PETRA"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "hidden items-stretch justify-center gap-8 self-stretch lg:flex",
					children: navItems.map((item) => {
						const active = isActivePath(item.href);
						return /* @__PURE__ */ jsxs("a", {
							href: item.href,
							"aria-current": active ? "page" : void 0,
							className: "group relative flex items-center font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-600 transition-colors duration-200 hover:text-neutral-950 focus-copper",
							children: [/* @__PURE__ */ jsx("span", { children: item.label }), /* @__PURE__ */ jsx("span", {
								className: `absolute bottom-4 left-0 h-0.5 w-full origin-left bg-[#9d5f35] transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`,
								"aria-hidden": "true"
							})]
						}, item.href);
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-end gap-3",
					children: [
						auth.user ? /* @__PURE__ */ jsx(Link, {
							href: auth.user.dashboard_url,
							className: "button-press focus-copper hidden h-10 items-center border border-neutral-300 px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-800 transition-colors hover:border-[#9d5f35] hover:text-[#9d5f35] md:flex",
							children: "Portal"
						}) : /* @__PURE__ */ jsx(Link, {
							href: "/login",
							className: "button-press focus-copper hidden h-10 items-center border border-neutral-300 px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-800 transition-colors hover:border-[#9d5f35] hover:text-[#9d5f35] md:flex",
							children: "Login"
						}),
						/* @__PURE__ */ jsx("a", {
							href: "/contact",
							className: "button-press focus-copper hidden h-10 items-center bg-[#9d5f35] px-6 font-heading text-base font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#874d29] md:flex",
							children: "Talk to a Broker"
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-expanded": menuOpen,
							className: "button-press focus-copper flex h-10 w-10 items-center justify-center border border-neutral-300 text-neutral-800 transition-colors hover:border-[#9d5f35] hover:text-[#9d5f35] lg:hidden",
							"aria-label": "Open menu",
							onClick: () => setMenuOpen((isOpen) => !isOpen),
							children: /* @__PURE__ */ jsx("span", { className: `block h-0.5 w-5 bg-current transition-transform before:block before:h-0.5 before:w-5 before:bg-current before:transition-transform before:content-[''] after:block after:h-0.5 after:w-5 after:bg-current after:transition-transform after:content-[''] ${menuOpen ? "rotate-45 before:translate-y-0 after:-translate-y-0.5 after:-rotate-90" : "before:-translate-y-1.5 after:translate-y-1"}` })
						})
					]
				})
			]
		}), menuOpen && /* @__PURE__ */ jsxs("div", {
			className: "reveal-down w-full border-b border-neutral-300 bg-[#f8f8f6] px-5 py-4 shadow-sm sm:px-10 lg:hidden",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex flex-col gap-1",
					children: navItems.map((item) => {
						const active = isActivePath(item.href);
						return /* @__PURE__ */ jsx("a", {
							href: item.href,
							"aria-current": active ? "page" : void 0,
							className: `focus-copper border-l-2 px-3 py-2 font-heading text-base font-semibold uppercase tracking-[0.08em] transition-colors ${active ? "border-[#9d5f35] text-neutral-950" : "border-transparent text-neutral-600 hover:text-neutral-950"}`,
							children: item.label
						}, item.href);
					})
				}),
				auth.user ? /* @__PURE__ */ jsxs("div", {
					className: "mt-3 grid grid-cols-2 gap-3 md:hidden",
					children: [/* @__PURE__ */ jsx(Link, {
						href: auth.user.dashboard_url,
						className: "button-press focus-copper flex h-10 items-center justify-center border border-neutral-300 px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-800",
						children: "Portal"
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: logout,
						className: "button-press focus-copper flex h-10 items-center justify-center border border-neutral-300 px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-800",
						children: "Logout"
					})]
				}) : /* @__PURE__ */ jsxs("div", {
					className: "mt-3 grid grid-cols-2 gap-3 md:hidden",
					children: [/* @__PURE__ */ jsx(Link, {
						href: "/login",
						className: "button-press focus-copper flex h-10 items-center justify-center border border-neutral-300 px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-800",
						children: "Login"
					}), /* @__PURE__ */ jsx(Link, {
						href: "/register",
						className: "button-press focus-copper flex h-10 items-center justify-center border border-neutral-300 px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-800",
						children: "Register"
					})]
				}),
				/* @__PURE__ */ jsx("a", {
					href: "/contact",
					className: "button-press focus-copper mt-3 flex h-10 items-center justify-center bg-[#9d5f35] px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#874d29] md:hidden",
					children: "Talk to a Broker"
				})
			]
		})]
	});
}
//#endregion
//#region resources/js/Layouts/AppLayout.tsx
function AppLayout({ children }) {
	const [isNavigating, setIsNavigating] = useState(false);
	useEffect(() => {
		const removeStartListener = router.on("start", () => setIsNavigating(true));
		const removeFinishListener = router.on("finish", () => setIsNavigating(false));
		return () => {
			removeStartListener();
			removeFinishListener();
		};
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-transparent text-neutral-950",
		children: [
			/* @__PURE__ */ jsx(NavBar, {}),
			/* @__PURE__ */ jsx(AnimatedPage, {
				busy: isNavigating,
				children
			}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
//#region resources/js/Layouts/BlankLayout.tsx
function BlankLayout({ children }) {
	const [isNavigating, setIsNavigating] = useState(false);
	useEffect(() => {
		const removeStartListener = router.on("start", () => setIsNavigating(true));
		const removeFinishListener = router.on("finish", () => setIsNavigating(false));
		return () => {
			removeStartListener();
			removeFinishListener();
		};
	}, []);
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-[#f3f1ec] text-neutral-950",
		children: /* @__PURE__ */ jsx(AnimatedPage, {
			busy: isNavigating,
			children
		})
	});
}
//#endregion
//#region resources/js/ssr.tsx
createServer((page) => createInertiaApp({
	page,
	render: renderToString,
	resolve: (name) => {
		const resolvedPage = (/* @__PURE__ */ Object.assign({
			"./Pages/Auth/ForgotPassword.tsx": ForgotPassword_exports,
			"./Pages/Auth/Login.tsx": Login_exports,
			"./Pages/Auth/Register.tsx": Register_exports,
			"./Pages/Auth/ResetPassword.tsx": ResetPassword_exports,
			"./Pages/Contact.tsx": Contact_exports,
			"./Pages/Equipment.tsx": Equipment_exports,
			"./Pages/Errors/NotFound.tsx": NotFound_exports,
			"./Pages/Home.tsx": Home_exports,
			"./Pages/Industries.tsx": Industries_exports,
			"./Pages/LegalPage.tsx": LegalPage_exports,
			"./Pages/Portal/Dashboard.tsx": Dashboard_exports,
			"./Pages/Portal/Placeholder.tsx": Placeholder_exports,
			"./Pages/Portal/Profile.tsx": Profile_exports,
			"./Pages/RequestEquipment.tsx": RequestEquipment_exports,
			"./Pages/SellEquipment.tsx": SellEquipment_exports,
			"./Pages/Services.tsx": Services_exports
		}))[`./Pages/${name}.tsx`];
		resolvedPage.default.layout ??= (pageContent) => {
			return /* @__PURE__ */ jsx(name.startsWith("Auth/") || name.startsWith("Portal/") ? BlankLayout : AppLayout, { children: pageContent });
		};
		return resolvedPage;
	},
	setup({ App, props }) {
		return /* @__PURE__ */ jsx(App, { ...props });
	}
}));
//#endregion
export {};
