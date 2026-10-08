document.addEventListener('DOMContentLoaded',() => {
  /* ---------- mobile menu ---------- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      burger.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---------- plan registration ---------- */
  const registrationPage = document.querySelector('[data-plan-registration]');
  if (registrationPage) {
    const plans = {
      essencial: {
        name: 'Plano Essencial',
        price: 'R$ 69,90',
        benefits: ['2 cortes por mês', 'Agendamento prioritário', 'Validade mensal flexível']
      },
      premium: {
        name: 'Plano Premium',
        price: 'R$ 119,90',
        benefits: ['4 cortes por mês', '1 barba completa por mês', 'Agendamento prioritário no app', 'Validade automática', 'Cerveja artesanal ou café cortesia']
      },
      black: {
        name: 'Plano Black',
        price: 'R$ 169,90',
        benefits: ['Até 4 cortes por mês', '4 barboterapias completas', '1 sobrancelha gratuita por mês', 'Fila zero e atendimento prioritário', 'Desconto de 15% em pomadas e loções']
      }
    };
    const plan = plans[new URLSearchParams(window.location.search).get('plano')];
    const registrationError = document.getElementById('registrationError');

    if (plan) {
      const planDetails = document.getElementById('registrationPlan');
      planDetails.innerHTML = `<h2>${plan.name}</h2><p class="registration-plan-price">${plan.price}<span> /mês</span></p><ul>${plan.benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>`;
      document.getElementById('planRegistrationForm').addEventListener('submit', event => {
        event.preventDefault();
        document.getElementById('registrationNotice').textContent =
          'Seus dados foram validados. O envio do cadastro ainda não está disponível neste site.';
      });
    } else {
      registrationPage.hidden = true;
      registrationError.hidden = false;
    }
  }

  /* ---------- service selection (grid on services section) ---------- */

  document.querySelectorAll('.service-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) =>{
        e.preventDefault();
        document.getElementById('agendamento').scrollIntoView({ behavior: 'smooth'});
    });
  });

    /* ---------- booking widget ---------- */
    const steps = ['servico', 'barbeiro', 'data', 'dados'];
    let current = 0;
    const selection = {
      servico: document.querySelector('.svc-opt.selected')?.dataset.service ?? null,
      barbeiro: document.querySelector('.barber-opt.selected')?.dataset.barber ?? null,
      data: null,
      hora: null
    };


    const stepEls = document.querySelectorAll('.step');
    const paneEls = document.querySelectorAll('.step-pane');


    function renderSteps() {
        stepEls.forEach((el, i) => {
            el.classList.toggle('active', i === current);
            el.classList.toggle('done', i < current)
        });
        paneEls.forEach((el, i) => el.classList.toggle('active' , i === current));
    }
    function goTo(i) {
        current = Math.max(0, Math.min(steps.length - 1, i));
        renderSteps();
        document.querySelector('.booking-card').scrollIntoView({ behavior: 'smooth', block: 'start'});
    }

    document.querySelectorAll('[data-next]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (current === 0 && !selection.servico) { alert('Selecione um serviço para continuar.'); return; }
        if (current === 1 && !selection.barbeiro) { alert('Selecione um barbeiro para continuar.'); return; }
        if (current === 2 && (!selection.data || !selection.hora)) { alert('Selecione uma data e um horário para continuar.'); return; }
        if (current === steps.length - 1) {
          alert('Agendamento confirmado! Em breve entraremos em contato para confirmar.');
          return;
        }
        goTo(current + 1);
      });
    });
    document.querySelectorAll('[data-prev]').forEach(btn => btn.addEventListener('click', () => goTo(current - 1)));

    document.querySelectorAll('.svc-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.svc-opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selection.servico = opt.dataset.service;
      });
    });
    document.querySelectorAll('.barber-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.barber-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selection.barbeiro = opt.dataset.barber;
    });
  });
    document.querySelectorAll('.slot').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.slot').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selection.hora = opt.textContent;
    });
  });
  const dateInput = document.getElementById('bookingDate');
  if (dateInput) dateInput.addEventListener('change', () => { selection.data = dateInput.value; });

  renderSteps();

  /* ---------- header shrink on scroll ---------- */
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 8 ? '0 8px 24px rgba(0,0,0,.35)' : 'none';
  });

  /* ---------- current year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});